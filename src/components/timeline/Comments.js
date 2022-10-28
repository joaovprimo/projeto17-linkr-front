import { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

export default function Comments({ comments, postId, setComments }) {
  return (
    <Wrapper>
      {comments.map((comment, i) => {
        return <Comment key={i} comment={comment} />;
      })}{" "}
      <CommentBox postId={postId} setComments={setComments} />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  z-index: -1;
  border-radius: 0 0 16px 16px;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  background: #1e1e1e;
  gap: 10px;
`;
