import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { PostList } from "../store/PostList-store";
import { useContext } from "react";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          <FaEye className="me-1" /> {post.views}
          <AiFillLike className="ms-3 me-1" />{post.reactions?.likes || 0}
          <AiFillDislike className="ms-3" /> {post.reactions?.dislikes || 0}
        </div>
      </div>
    </div>
  );
};
export default Post;
