import styled from "styled-components";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import LinkPreview from "./Linkpreview";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { device } from "../../mediaqueries/devices.js";
import ReactTooltip from "react-tooltip";
import { useEffect, useState, useContext } from "react";
import {
  getLikesPost,
  GetUser,
  postLike,
  editPost,
  getRepostsCountById,
  getNameUser,
  getComments,
} from "../../services/linkr";
import UserContext from "../../context/UserContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

export default function Post({
  name,
  description,
  image,
  urlInfo,
  url,
  id,
  userId,
  reposterId,
  originPostId,
  openModalRepost,
  setBodyToRepost,
  setAttTrending,
  attTrending,
}) {
  const [likesPost, setLikesPost] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const promisse = getComments(id);
    promisse.then((res) => {
      setComments(res.data);
    });
  }, []);

  const [userr, setUserr] = useState("");
  const [size, setSize] = useState(0);
  const [editing, setEditing] = useState(false);
  const [descriptionEdited, setDescriptionEdited] = useState({
    description: "",
  });
  const [descriptionState, setDescriptionState] = useState(description);
  const [repostsCount, setRepostsCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [reposterName, setReposterName] = useState("");
  const { user, setIsOpened,isOpened, setIdPost } = useContext(UserContext);

  let likes, sec, tamanho, tam, usr;
  let first = 0;
  const navigate = useNavigate();
  const ref = useRef();

  const isOriginalPost = () => {
    return originPostId === null;
  };

  useEffect(() => {
    let idToFetch;
    isOriginalPost() ? (idToFetch = id) : (idToFetch = originPostId);
    const repostsCountPromisse = getRepostsCountById(idToFetch);
    repostsCountPromisse
      .then((res) => setRepostsCount(res.data.repostsNumber))
      .catch((error) => setRepostsCount(0));
  }, []);

  useEffect(() => {
    if (!isOriginalPost()) {
      const promisse = getNameUser(reposterId, user.token);
      promisse
        .then((res) => {
          setReposterName(res.data[0].username);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    setDescriptionState(description);
  }, [description]);

  function postRepostOnClick() {
    let body = { idPost: "", reposterId: user.userId };
    if (!originPostId && !reposterId) {
      //POST ORIGINAL
      body = { ...body, idPost: id };
    } else {
      body = { ...body, idPost: originPostId };
    }
    setBodyToRepost(body);
    openModalRepost();

    // if (window.confirm("Are you sure to repost this?")) {
    //   const promisse = postRepost(body);
    //   promisse.then(res => console.log("repost feito com sucesso")).catch(error => console.log(error.response.data))
    // }
  }

  useEffect(() => {
    ref.current?.focus();
  }, [editing]);

  function newDescription(e) {
    setDescriptionEdited({
      ...descriptionEdited,
      [e.target.name]: e.target.value,
    });
  }

  const openModal = () => {
    setIdPost(id);
    setIsOpened(true);
  };

  useEffect(() => {
    if (!isOriginalPost()) id = originPostId;
    getLikesPost(id)
      .then((resp) => {
        console.log(resp.data);
        setLikesPost(resp.data.likesarray);
        setSize(resp.data.likeslength);
      })
      .catch((err) => console.log(err.message));

    GetUser(user?.userId)
      .then((resp) => {
        setUserr(resp.data.username);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function likePost(id) {
    if (!isOriginalPost()) id = originPostId;
    postLike(id, user.userId)
      .then((resp) => {
        setLikesPost(resp.data.likesarray);
        setAttTrending(attTrending + 1);
        setSize(resp.data.likeslength);
      })
      .catch((err) => console.log(err.message));
  }

  function type() {
    if (typeof likesPost === "object") {
      likes = likesPost.map((lik) => lik.username);
      let find = likes.filter((ele) => ele === userr);
      if (find.length > 0) {
        usr = userr;
      }
      if (typeof likesPost === "object") {
        likes = likesPost.map((lik) => lik.username);
        let find = likes.filter((ele) => ele === userr);
        if (find.length > 0) {
          usr = userr;
        }
        if (size - 2 < 0) {
          if (size === 0) {
            first = 0;
          } else {
            first = likes[0];
          }
          tamanho = 0;
          sec = null;
        } else {
          tam = size;
          first = likes[0];
          tamanho = size - 2;
          sec = likes[1];
        }
      }
    }
  }
  type();
  //  const tagStyle = {
  //   color: "white",
  //   fontWeight: 700,
  //   cursor: "pointer",
  // };

  function press(event) {
    if (event.key === "Enter") {
      const promisse = editPost(id, descriptionEdited);
      setDisable(true);
      promisse
        .then(() => {
          setAttTrending(attTrending + 1);
          setDisable(false);
          setEditing(false);
          setDescriptionState(descriptionEdited.description);
          alert("Post was saved");
        })
        .catch((err) => {
          console.log(err);
          alert("Edition was not saved, please try again");
        });
    }
    if (event.key === "Escape") {
      setEditing(false);
    }
  }

  return (
    <Container>
      <RepostBox className="repostBox" isOriginalPost={isOriginalPost()}>
        <BiRepost size={20} color={"white"} />
        {user ? (
          <h3>
            Re-posted by
            <span>
              {reposterId === user.userId
                ? "you"
                : reposterName
                ? reposterName
                : "Loading.."}
            </span>
          </h3>
        ) : (
          <></>
        )}
      </RepostBox>
      <Wrapper>
        <div className="profilePic">
          <img
            src={image}
            alt="profilePost"
            onClick={(e) => {
              navigate(`/user/${userId}`);
            }}
          />
          <div>
            {usr ? (
              <>
                {tam ? (
                  <>
                    <AiFillHeart
                      color="red"
                      cursor="pointer"
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
                      color="red"
                      cursor="pointer"
                      size={20}
                      data-for="main"
                      data-tip={`${first}`}
                      data-iscapture="true"
                      onClick={() => likePost(id)}
                    />
                    <h4
                      data-for="main"
                      data-tip={`${first}`}
                      data-iscapture="true"
                    >
                      {size}
                    </h4>{" "}
                  </>
                )}
              </>
            ) : (
              <>
                {tam ? (
                  <>
                    <AiFillHeart
                      color="white"
                      cursor="pointer"
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
                ) : (
                  <>
                    <AiFillHeart
                      color="white"
                      cursor="pointer"
                      size={20}
                      data-for="main"
                      data-tip={`${first}`}
                      data-iscapture="true"
                      onClick={() => likePost(id)}
                    />
                    <h4
                      data-for="main"
                      data-tip={`${first}`}
                      data-iscapture="true"
                    >
                      {size}
                    </h4>
                  </>
                )}
              </>
            )}
            <ReactTooltip
              id="main"
              place="bottom"
              type="light"
              effect="float"
              multiline={true}
            />
          </div>
          <div
            className="profilePic__icon profilePic__icon-comentary"
            onClick={() => setShowComments(!showComments)}
          >
            <AiOutlineComment size={20} color={"white"} />
            <h3>{comments.length} comment</h3>
          </div>
          <div
            className="profilePic__icon profilePic__icon-repost"
            onClick={postRepostOnClick}
          >
            <BiRepost size={20} color={"white"} />
            <h3>{repostsCount} reposts</h3>
          </div>
        </div>

        <div className="content">
          <div className="content__headers">
            <div className="content__headers-buttons">
              <h2
                className="content__headers-name"
                onClick={() => {
                  navigate(`/user/${userId}`);
                }}
              >
                {" "}
                {name}{" "}
              </h2>
              <div>
                <TbEdit
                  color="white"
                  size={20}
                  cursor="pointer"
                  onClick={() => {
                    if (name === userr) {
                      setEditing(true);
                    } else {
                      alert("you are not allowed to edit!");
                    }
                  }}
                />
                <AiOutlineDelete
                  color="white"
                  size={20}
                  cursor="pointer"
                  onClick={openModal}
                />
              </div>
            </div>
            {editing ? (
              <input
                onKeyDown={press}
                ref={ref}
                onFocus={(event) => event.persist()}
                name="description"
                onChange={newDescription}
                value={descriptionEdited.description}
                disabled={disable ? true : false}
              />
            ) : (
              <p className="content__headers-description">{descriptionState}</p>
            )}
          </div>
          <LinkPreview url={url} urlInfo={urlInfo} />
        </div>
      </Wrapper>
      {showComments ? (
        <Comments comments={comments} postId={id} setComments={setComments} />
      ) : null}
    </Container>
  );
}
/*<ReactTagify
tagStyle={tagStyle}
tagClicked={(hashtag) =>
  navigate(`/hashtag/${hashtag.replace("#", "")}`)
}
>
</ReactTagify>*/

const Container = styled.div`
  background-color: #1e1e1e;
  border-radius: 16px;
  margin-bottom: 44px;
`;
const RepostBox = styled.div`
  background-color: #1e1e1e;
  color: white;
  height: 3.5rem;
  margin-bottom: -0.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: ${(props) => (props.isOriginalPost ? "none" : "flex")};
  padding: 1rem;
  align-items: center;
  font-size: 1.1rem;
  h3 {
    margin-left: 0.4rem;
  }
  span {
    font-weight: 900;
    margin-left: 0.2rem;
  }
`;
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
  input {
    border: none;
    height: 2rem;
    border-radius: 3px;
    background-color: #efefef;
    padding-left: 1rem;
    color: #949494;
  }
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
    height: 20vh;
    &__icon {
      color: white;
      transition: all 0.3s;
      :hover {
        cursor: pointer;
        transform: scale(1.05);
      }
    }
    h4 {
      color: white;
    }
    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
      cursor: pointer;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
