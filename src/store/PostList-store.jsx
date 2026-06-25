import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Going to Goa",
//     body: "Hi Friends, going to Goa for a vacation!",
//     reactions: {
//     likes: 192,
//     dislikes: 25,
//     },
//     views:30,
//     userId: "user-9",
//     tags: ["vacation", "Goa", "Enjoying"],
//   },
//   {
//     id: "2",
//     title: "Pass ho gye yrr",
//     body: "Hi Friends, 4 saal ki masti ke baad bhi pass ho gye!",
//     reactions: {
//     likes: 192,
//     dislikes: 25,
//     },
//     views:500,
//     userId: "user-7",
//     tags: ["Graduation", "B-Tech", "Unbeleivable"],
//   },
//   {
//     id: "3",
//     title: "It's my birthday!",
//     body: "Hi Friends, today is my 23rd Birthday!. Feeling excited!",
//     reactions: {
//     likes: 192,
//     dislikes: 25,
//     },
//     views:50,
//     userId: "user-7",
//     tags: ["Birthday", "Party", "Excited"],
//   },
// ];

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId,
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const [fetching, setFetching] = useState(false);
  
  const addPost = (post) => {
    //console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);

    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    //console.log(`delete post called for: ${postId}`);
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  useEffect(() => {
    // if (postList.length > 0) return;
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("Cleaning up useEffect.");
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider
      value={{
        postList: postList,
        fetching: fetching,
        addPost: addPost,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
