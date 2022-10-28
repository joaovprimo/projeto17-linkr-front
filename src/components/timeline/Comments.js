import { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";

export default function Comments({ comments }) {
  return (
    <Wrapper>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}{" "}
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
