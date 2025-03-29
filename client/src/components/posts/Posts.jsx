import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../Axios";

const Posts = ({ userId }) => {
  // ✅ Latest useQuery Syntax (Object-Based)
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data),
  });

  if (isLoading) {
    return <div className="posts">Loading posts... ⏳</div>;
  }

  if (error) {
    return <div className="posts">🚨 Something went wrong: {error.message}</div>;
  }

  return (
    <div className="posts">
      {data.length === 0 ? (
        <p>No posts found! 📭</p>
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
