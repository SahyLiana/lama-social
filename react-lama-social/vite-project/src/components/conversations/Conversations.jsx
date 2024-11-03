/* eslint-disable react/prop-types */
import "./conversations.css";
import Person from "../../../public/person/1.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";

function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find(
      (memb) => memb !== currentUser._id
    );

    console.log("FriendId,currentUserId", friendId, currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(
          `http://localhost:8800/api/users?userId=${friendId}`
        );

        console.log("Get user friend", res.data);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img src={Person} className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversations;
