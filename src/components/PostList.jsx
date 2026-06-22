import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/PostList-store";
import WelcomeMessage from "./WelcomeMessage";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  const handleGetPostClick = () => {
    // console.log("get post clicked.");
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then(data => {
        addInitialPosts(data.posts);
      });
  };

  return (
    <>
      {postList.length === 0 && (
        <WelcomeMessage onGetPostClick={handleGetPostClick}></WelcomeMessage>
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </>
  );
};
export default PostList;
