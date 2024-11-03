/* eslint-disable react/prop-types */
import "./rightbar.css";
import Birthday from "../../assets/gift.png";
import Ad from "../../assets/ad.png";

// import Person2 from "../../assets/person/2.jpeg";
// import Person3 from "../../assets/person/3.jpeg";
// import Person4 from "../../assets/person/4.jpeg";
// import Person5 from "../../assets/person/5.jpeg";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user]);

  const handleClickFollow = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:8800/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (e) {
      console.log(e);
    }

    setFollowed(!followed);
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `http://localhost:8800/api/users/friends/${user._id}`
        );
        setFriends(friendList.data);
      } catch (e) {
        console.log(e);
      }
    };
    getFriends();
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <img src={Birthday} alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>Pola Foster </b>and{" "}
              <b>3 other friends have a birthday today</b>
            </span>
          </div>
          <img className="rightBarAd" src={Ad} alt="" />
          <h4 className="rightbarTitle">Online friends</h4>
          <ul className="rightbarFriendList">
            {/* <li className="rightBarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" alt="" src={Person3} />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Jane Doe</span>
          </li> */}

            {Users.map((user) => (
              <Online user={user} key={user.id} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClickFollow}>
            {followed ? "Unfollow" : "Follow +"}
          </button>
        )}
        <h4 className="rightbarTitle">User information title</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Married"
                  : "Unknown"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTtile">User friends</h4>
        <div className="rightbarFollowings">
          {/* <div className="rightbarFollowing">
            <img src={Person1} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div> */}

          {friends.length > 0 ? (
            friends.map((friend) => (
              <Link
                key={friend._id}
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      `${friend.profilePicture}`
                        ? `http://localhost:8800/images/person/${friend.profilePicture}`
                        : `http://localhost:8800/images/person/noAvatar.png`
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p>No friends</p>
          )}

          {/* <div className="rightbarFollowing">
            <img src={Person2} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={Person3} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={Person4} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={Person5} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src={Person5} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div> */}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      {user ? <ProfileRightBar /> : <HomeRightbar />}
      {/* <ProfileRightBar /> */}
    </div>
  );
}

export default Rightbar;
