/* eslint-disable react/prop-types */
import "./chatOnline.css";
import Person from "../../../public/person/3.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users/friends/${currentId}`
      );
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversation/find/${currentId}/${user._id}`
      );

      setCurrentChat(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((online) => (
        <div
          className="chatOnlineFriend"
          key={online._id}
          onClick={() => handleClick(online)}
        >
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={Person} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online.username}</span>
        </div>
      ))}
      {/* <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={Person} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John doe</span>
      </div> */}
    </div>
  );
}

export default ChatOnline;
