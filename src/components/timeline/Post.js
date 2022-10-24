import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LinkPreview from "./Linkpreview";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { device } from "../../mediaqueries/devices.js";
import ReactTooltip from "react-tooltip";
import { useEffect, useState, useContext } from "react";
import { getLikesPost, GetUser, postLike } from "../../services/linkr";
import UserContext from "../../context/UserContext";
import Modal from "../../pages/Modal";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";


export default function Post({ name, description, image, urlInfo, url, id ,userId}) {
  const [likesPost, setLikesPost] = useState("");
  const [userr, setUserr] = useState("");
  const [size, setSize] = useState(0);
  const navigate = useNavigate();

  const openModal = () => {
    setIdPost(id);
    setIsOpened(true);
  };

  const { user, setUser, isOpened, setIsOpened, idPost, setIdPost } =
    useContext(UserContext);
  let likes, usr, indice, sec, first, tamanho, lisklength;
  useEffect(() => {
    getLikesPost(id)
      .then((resp) => {
        console.log(resp.data);
        setLikesPost(resp.data.likesarray);
        setSize(resp.data.likeslength);
      })
      .catch(() => console.log("nada"));

    GetUser(user?.userId)
      .then((resp) => {
        console.log(resp.data);
        setUserr(resp.data.username);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function likePost(id) {
    postLike(id, user.userId)
      .then((resp) => {
        setLikesPost(resp.data.likesarray);
        setSize(resp.data.likeslength);
      })
      .catch((err) => console.log(err.message));
  }
  if (typeof likesPost === "object") {
    likes = likesPost.map((lik) => lik.username);
    console.log(likes);
    console.log(size);
    let find = likes.filter((ele) => ele === userr);
    console.log(find);
    if (find.length > 0) {
      usr = userr;
    }
    first = likes[0];
    sec = likes[1];
    console.log(first, sec);
    if (size - 2 < 0) {
      tamanho = 0;
    } else {
      tamanho = size - 2;
    }
  }
  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <Wrapper onClick={() => {
      navigate(`/user/${userId}`);
      window.location.reload();
  }}>
      <div className="profilePic">
        <img src={image} alt="profilePost" />
        <div>
          {usr ? (
            <>
              <AiFillHeart
                color="red"
                size={20}
                data-for="main"
                data-tip={`${first}, ${sec} e outras ${tamanho} pessoas`}
                data-iscapture="true"
                onClick={() => likePost(id)}
              />
              <h4
                data-for="main"
                data-tip={`${first}, ${sec} e outras ${tamanho} pessoas`}
                data-iscapture="true"
              >
                {size}
              </h4>{" "}
            </>
          ) : (
            <>
              <AiFillHeart
                color="white"
                size={20}
                data-for="main"
                data-tip={`${first}, ${sec} e outras ${tamanho} pessoas`}
                data-iscapture="true"
                onClick={() => likePost(id)}
              />
              <h4
                data-for="main"
                data-tip={`${first}, ${sec} e outras ${tamanho} pessoas`}
                data-iscapture="true"
              >
                {size}
              </h4>
            </>
          )}
          <ReactTooltip
            id="main"
            place={"bottom"}
            type={"light"}
            effect={"float"}
            multiline={"true"}
          />
        </div>
      </div>

      <div className="content">
        <div className="content__headers">
          <div className="content__headers-buttons">
            <h2 className="content__headers-name"> {name}</h2>
            <div>
              <TbEdit color="white" size={20} />
              <AiOutlineDelete color="white" size={20} onClick={openModal} />
            </div>
          </div>

          <p className="content__headers-description">
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(hashtag) =>
                navigate(`/hashtag/${hashtag.replace("#", "")}`)
              }
            >
              {description}
            </ReactTagify>
          </p>
        </div>
        <LinkPreview url={url} urlInfo={urlInfo} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  min-height: 25vh;
  min-width: 100%;
  max-width: 100%;
  border-radius: 1rem;
  background-color: rgba(23, 23, 23, 0.95);
  padding: 1.5rem;
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  span {
    font-weight: bold;
  }
  @media ${device.mobileM} {
    max-width: 100vw;
    overflow: scroll;
  }
  .content {
    min-width: 100%;
    min-width: 90%;
    min-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media ${device.mobileM} {
      max-width: 80vw;
    }
    &__headers {
      display: flex;
      flex-direction: column;
      min-height: 6vh;
      justify-content: space-around;
      max-width: 100%;
      word-break: break-all;
      &-buttons {
        display: flex;
        justify-content: space-between;
      }
      &-name {
        font-size: 2rem;
        color: white;
        @media ${device.mobileM} {
          font-size: 1.5rem;
        }
      }
      &-description {
        font-size: 1.3rem;
        color: #b7b7b7;
        margin: 1rem 0;
      }
    }
  }
  .profilePic {
    margin-left: -0.5rem;
    margin-right: 1rem;
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 10rem;

    h4 {
      color: white;
    }
    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
