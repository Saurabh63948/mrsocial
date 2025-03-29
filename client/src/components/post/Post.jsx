import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../Axios";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Function to Upload File
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Upload Error: ", err);
      return "";
    }
  };

  // ✅ Fetch Likes
  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get(`/likes?postId=${post.id}`).then((res) => res.data),
  });

  // ✅ Handle Like/Unlike
  const likeMutation = useMutation({
    mutationFn: (liked) =>
      liked
        ? makeRequest.delete(`/likes?postId=${post.id}`)
        : makeRequest.post("/likes", { postId: post.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", post.id] });
    },
  });

  // ✅ Handle Post Deletion
  const deleteMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/posts/${post.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ✅ Toggle Like
  const handleLike = () => {
    likeMutation.mutate(data?.includes(currentUser.id));
  };

  // ✅ Handle Post Deletion
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  // ✅ Handle File Upload
  const handleFileUpload = async (e) => {
    setFile(e.target.files[0]);
    const imgUrl = await upload();
    console.log("Uploaded Image URL: ", imgUrl);
    setFile(null); // Reset file after upload
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + currentUser.profilePic} alt="Profile" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>

        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={"/upload/" + post.img} alt="Post" />}
        </div>

        <div className="info">
          <div className="item" onClick={handleLike}>
            {isLoading ? (
              "Loading..."
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <span>{data?.length || 0} Likes</span>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <span>See Comments</span>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            <span>Share</span>
          </div>
        </div>

        {/* ✅ File Upload Input */}
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <label htmlFor="file" className="uploadBtn">
          Upload Image
        </label>

        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
