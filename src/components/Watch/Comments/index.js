import React, { useEffect, useState } from "react";
import fetchFromApi from "../../utils/fetchFromApi";
import Comment from "../Comment";

const Comments = (props) => {
  const { videoId } = props;
  const [commentslist, setComments] = useState(null);

  useEffect(() => {
    const url = `commentThreads?part=snippet%2Creplies&videoId=${videoId}&maxResults=25`;
    fetchFromApi(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setComments(data?.items);
      });
  });

  return (
    <ul className="comments">
      {commentslist?.map((comment) => (
        <Comment comment={comment} />
      ))}
    </ul>
  );
};

export default Comments;
