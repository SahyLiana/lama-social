import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import Profile3 from "../../../public/person/noCover.png";
import User7 from "../../../public/person/noAvatar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});

  const username = useParams().username;
  // console.log("Params", params);

  useEffect(() => {
    console.log("Feed Rendered");

    const getUser = async () => {
      const response = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
      console.log(response);

      setUser(response.data);
    };
    getUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || Profile3}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || User7}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <p className="profileInfoDesc">{user.desc}</p>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
