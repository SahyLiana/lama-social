/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./message.css";
import Person from "../../../public/person/2.jpeg";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    // <div className="message own">
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={Person} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
