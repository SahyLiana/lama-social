/* eslint-disable react/prop-types */
import "./online.css";

function Online({ user }) {
  return (
    <li className="rightBarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" alt="" src={user.profilePicture} />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}

export default Online;
