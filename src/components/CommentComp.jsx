import React from "react";

export default function CommentComp({ comment }) {
  return (
    <>
      <h1>{comment.text}</h1>
    </>
  );
}
