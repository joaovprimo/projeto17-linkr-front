import { useEffect, useState } from "react";
import styled from "styled-components";
import { getComments, GetUser, postComment } from "../../services/linkr";
import { FiSend } from "react-icons/fi";

/* GetUser;
 */ export default function CommentBox({ postId, setComments }) {
  const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [picture, setPicture] = useState("");
  const [comment, setComment] = useState("");
  const [disable, setDisable] = useState(false);

  console.log(comment);
  useEffect(() => {
    const promisse = GetUser(storageUserInfo.userId);
    promisse.then((res) => {
      setPicture(res.data.pictureUrl);
    });
  }, []);

  function sendComment(e) {
    e.preventDefault();
    setDisable(true);

    const promisse = postComment({ postId: postId, comment: comment });
    promisse
      .then((res) => {
        const updateComments = getComments(postId);
        updateComments.then((e) => {
          setComments(e.data);
        });
      })
      .catch((res) => {
        window.alert(res.data);
      });
    setDisable(false);
    setComment("");
  }
  return (
    <Wrapper>
      <div className="leftside">
        <img src={picture} alt="userimg"></img>
      </div>
      <form onSubmit={sendComment}>
        <input
          placeholder="write a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          required
        ></input>
        <button type="submit" disabled={disable}>
          <FiSend color="white" cursor="pointer" size={20}></FiSend>
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 25px;
  justify-content: center;
  .leftside {
    height: 100%;
    width: 18%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  form {
    width: 100%;
    display: flex;
    background-color: #252525;
    border-radius: 8px;
    input {
      outline: none;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #575757;
      width: 95%;
      padding-left: 14px;
      border: none;
      border-radius: 8px;
      background-color: #252525;
    }
    input::placeholder {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #575757;
    }
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    object-fit: fill;
  }
  button {
    background: none;
    border: none;
  }
`;
