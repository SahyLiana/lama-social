/* eslint-disable react/prop-types */
import "./post.css";
// import Person1 from "../../assets/person/1.jpeg";
import Post1 from "../../../public/post/1.jpeg";
import Heart from "../../assets/heart.png";
import Like from "../../assets/like.png";
import DummyProfile from "../../../public/person/noAvatar.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
function Post({ post }) {
  console.log(post);

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    console.log("Feed Rendered");

    const getUser = async () => {
      const response = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      console.log(response);

      setUser(response.data);
    };
    getUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (e) {
      console.log(e);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? user.profilePicture : DummyProfile}
                alt=""
              />
            </Link>

            <span className="postUsername">
              {/* {user.filter((user) => user.id === post.userId)[0].username} */}
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="portTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img || Post1} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={Like} alt="" onClick={likeHandler} />
            <img
              className="likeIcon"
              src={Heart}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
