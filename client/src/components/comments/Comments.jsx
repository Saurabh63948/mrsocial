import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../Axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  // ✅ Latest useMutation with object syntax (React Query v5)
  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (desc.trim() === "") return; // Empty comment validation

    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="Profile" />
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>Failed to load comments</p>
      ) : (
        data?.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.profilePic} alt="Profile" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
