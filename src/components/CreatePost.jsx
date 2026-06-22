import { useContext, useRef } from "react";
import { PostList } from "../store/PostList-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const likesElement = useRef();
  const dislikesElement = useRef();
  const viewsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const likes = Number(likesElement.current.value);
    const dislikes = Number(dislikesElement.current.value);
    const views = Number(viewsElement.current.value);
    const tags = tagsElement.current.value.split(" ");

    addPost(userId, postTitle, postBody, { likes, dislikes }, views, tags);

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";
    viewsElement.current.value = "";
    tagsElement.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter ypur UserId here
        </label>
        <input
          type="text"
          ref={userIdElement}
          placeholder="UserID"
          className="form-control"
          id="userId"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          placeholder="Enter post title..."
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          placeholder="Tell us more about it..."
          className="form-control"
          id="body"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of views
        </label>
        <input
          type="text"
          ref={viewsElement}
          placeholder="How many people view to this post"
          className="form-control"
          id="views"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of likes
        </label>
        <input
          type="number"
          ref={likesElement}
          placeholder="How many people liked this post"
          className="form-control"
          id="likes"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of dislikes
        </label>
        <input
          type="number"
          ref={dislikesElement}
          placeholder="How many people disliked this post"
          className="form-control"
          id="dislikes"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          ref={tagsElement}
          placeholder="Enter tags using space..."
          className="form-control"
          id="tags"
          aria-describedby="emailHelp"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
