import React from "react";
import img from "../../assets/user-profile-icon-free-vector.jpg"

const CommentItem = ({ comment }) => (
  <div className="flex py-2 gap-2 my-2">
    <img
      src={img}
      alt="User Avatar"
      className="rounded-full w-10 h-10"
    />
    <div>
      <h1 className="font-semibold">{comment.author?.name || "Anonymous"}</h1>
      <p className="text-gray-400 text-sm">
        {comment.createdAt
          ? new Date(comment.createdAt).toLocaleDateString()
          : "Date unknown"}
      </p>
      <p>{comment.content}</p>
    </div>
  </div>
);

export default CommentItem;
