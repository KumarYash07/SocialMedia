import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/PostList-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  // Fetching posts using  useState()

  // const [dataFetched, setDataFetched] = useState(false);
  // if(!dataFetched){
  //   fetch("https://dummyjson.com/posts")
  //     .then((res) => res.json())
  //     .then(data => {
  //       addInitialPosts(data.posts);
  //     });
  //     setDataFetched(true);
  // }

  // Fetching posts using UseEffect()
  // useEffect(()=>{
  //   fetch("https://dummyjson.com/posts")
  //     .then((res) => res.json())
  //     .then(data => {
  //       addInitialPosts(data.posts);
  //     });
  // }, []);


  const [fetching, setFetching] = useState(false);
  useEffect(()=>{
    setFetching(true);
    console.log("Fetch started");
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then(data => {
        addInitialPosts(data.posts);
        setFetching(false);
        console.log("Fetch returned");
      });
      console.log("Fetch ended");
  }, []);


  return (
    <>
      {/*fetching && */ <LoadingSpinner></LoadingSpinner>}
      {postList.length === 0 && (
        <WelcomeMessage></WelcomeMessage>
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </>
  );
};
export default PostList;
