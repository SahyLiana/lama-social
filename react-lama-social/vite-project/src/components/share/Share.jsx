import "./share.css";
// import Person1 from "../../assets/person/1.jpeg";
import NoAvatar from "../../../public/person/noAvatar.png";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

function Share() {
  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);

  const submitHandle = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;

      console.log("FileName", fileName, file.name);

      formData.append("file", file);
      formData.append("name", fileName);
      newPost.img = fileName;

      console.log(
        "Array from data entries,newPost",
        Array.from(formData.entries()),
        newPost
      );

      try {
        await axios.post("http://localhost:8800/api/upload", formData);
      } catch (e) {
        console.log(e);
      }
    }

    try {
      await axios.post("http://localhost:8800/api/posts", newPost);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture || NoAvatar}
            className="shareProfileImg"
            alt=""
          />
          <input
            placeholder={`What s in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>

        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            {/*This URL.createObjectURL(file) will show our file before uploading it*/}
            <img src={URL.createObjectURL(file)} className="shareImg" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}

        <form
          className="shareBottom"
          onSubmit={submitHandle}
          method="post"
          encType="multipart/form-data"
        >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
