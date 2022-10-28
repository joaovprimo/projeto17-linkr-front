import { useEffect, useState } from "react";
import styled from "styled-components";
import { GetUser } from "../../services/linkr";
/* GetUser;
 */ export default function CommentBox() {
  const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [picture, setPicture] = useState("");
  useEffect(() => {
    const promisse = GetUser(storageUserInfo.userId);
    promisse.then((res) => {
      setPicture(res.data.pictureUrl);
    });
  }, []);
  return (
    <Wrapper>
      <img src={picture} alt="userimg"></img>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  img {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    object-fit: fill;
  }
`;
