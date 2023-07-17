import React from "react";

const Comment = (props) => {
  const { comment } = props;
  const { textDisplay, authorDisplayName, authorProfileImageUrl } =
    comment?.snippet;
  return (
    <li>
      <div className="comment-logo">
        <img  src={authorProfileImageUrl} alt=""/>
      </div>
      <div className="comment-details">
        <p className="comment-user">{authorDisplayName}</p>
        <p className="comment-text">{textDisplay}</p>
      </div>
    </li>
  );
};

export default Comment;
