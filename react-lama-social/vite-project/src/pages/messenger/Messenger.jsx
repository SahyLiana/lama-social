/* eslint-disable react/jsx-key */
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

//Setting the socket in the client
import { io } from "socket.io-client";

function Messenger() {
  // const socketIO = io("http://localhost:3002");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);

  //Socket setting
  // const [socket, setSocket] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:3002");
  }, []);

  // useEffect(() => {
  // setSocket(io("http://localhost:8900"));
  // setSocket(socketIO);
  // setSocket(io.connect("http://localhost:3002"));
  // setSocket(socketIO);
  // setSocket(socketIO);
  // }, []);

  // useEffect(() => {
  //   socket?.on("test", (msg) => {
  //     console.log(msg);
  //   });
  // }, [socket]);

  useEffect(() => {
    socket.current.on("test", (msg) => {
      console.log(msg);
    });

    socket.current.emit("addUser", user._id);

    socket.current.on("getUsers", (users) => {
      console.log("Online users", users);
      setOnlineUsers(
        user.followings.filter((following) =>
          users.some((u) => u.userId === following)
        )
      );
    });
  }, [user]);

  //SCROLL TO LAST MESSAGE
  const scrollRef = useRef();

  // console.log(user);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/conversation/${user._id}`
        );

        // console.log("Conversation response", res);
        setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, [user._id]);

  // useEffect(() => {
  //   console.log("Welcome message from the socket (useEffect)");

  //   socketIO.on("test", (msg) => {
  //     console.log("dfsfwer", msg);
  //   });
  // }, [socketIO]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/message/${currentChat?._id}`
        );
        console.log("Res currentchat", res);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  console.log("Messages", messages);
  console.log("CurrentChat", currentChat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `http://localhost:8800/api/message`,
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {" "}
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {/* <Conversations />
            <Conversations />
            <Conversations /> */}

            {conversations.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                {" "}
                <Conversations conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {currentChat ? (
                <>
                  {/* <Message />
                  <Message own={true} />
                  <Message /> */}
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      {" "}
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                  <div className="chatBoxBottom">
                    <textarea
                      placeholder="Write your message..."
                      className="chatMessageInput"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat
                </span>
              )}
              {/* <Message />
              <Message own={true} />
              <Message /> */}
            </div>
            {/* <div className="chatBoxBottom">
              <textarea
                placeholder="Write your message..."
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div> */}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
            {/* <ChatOnline />
            <ChatOnline />
            <ChatOnline /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
