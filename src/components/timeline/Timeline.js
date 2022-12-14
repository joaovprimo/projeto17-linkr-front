import { useContext, useEffect, useState } from "react";
import { MagnifyingGlass, ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import useInterval from 'use-interval'
import UserContext from "../../context/UserContext.js";
import { device } from "../../mediaqueries/devices";
import { getPosts, postPublicate, getUserInfo } from "../../services/linkr";
import Post from "./Post.js";
import Trending from "./Trending";
import { FiRefreshCcw } from "react-icons/fi";

import Modal from "../../pages/Modal.js";

export default function Timeline() {
  const { user, setUser, isOpened,setIsOpened } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({ email: "", id: null, pictureUrl: "", username: "" })
  const [newPost, setNewPost] = useState({
    url: "",
    description: "",
    userId: "",
  });
  const [isPublicating, setIsPublicating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postMessage, setPostMessage] = useState("Message");
  const [newsPosts, setNewsPosts] = useState(0);
  const [findPosts, setFindPosts] = useState(false);
  let lastPosts =  posts.length;
  let pts = [];
  const [attTrending, setAttTrending] = useState(0);
  const [isOpenedRepost, setIsOpenedRepost] = useState(false)
  const [bodyToRepost, setBodyToRepost] = useState({})


  useEffect(() => {
    if (!user) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUser(userInfo);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const promisse = getUserInfo(user.headers);
      promisse.then(authorized);
      promisse.catch(unauthorized);
    };
  }, [user])

  function authorized(response) {
    setUserInfo(response.data);
  }

  function unauthorized(error) {
    alert(error.message);
  }

  useEffect(() => {
    setNewPost({ ...newPost, userId: user?.userId });
  }, [user]);

  function getNewPosts(){
    setNewsPosts(0)
    getPosts().then((res)=>{
      pts = res.data;
      if(pts==='no posts'){
        pts = '';
      }
      setNewsPosts(pts.length - lastPosts) ;
      setFindPosts(true);
      console.log(newsPosts);
    }).catch((err)=> console.log(err))}

  useInterval(()=>getNewPosts() ,15000)


  function loadNewPosts(){
    setFindPosts(false);
    getTimelinePosts();
  }

  useEffect(() => {
    getTimelinePosts();
  }, []);

  function getTimelinePosts(){
    const promisse = getPosts();
    promisse.then((res) => {
      console.log(res.data)
      if (res.data === 'no follows') {
        setPosts([]);
        setLoading(false);
        setPostMessage('You dont follow anyone yet. Search for new friends')
        return
      }
      if (res.data === 'no posts') {
        setPosts([]);
        setLoading(false);
        setPostMessage('No posts found from your friends')
        return
      }
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
    });
    promisse.catch((error) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }

  function handleNewPost(e) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }
  function publicate(e) {
    e.preventDefault();
    const promisse = postPublicate(newPost);
    setIsPublicating(true);
    promisse.then((res) => {
      alert("Post publicado com sucesso");
      setNewPost({
        url: "",
        description: "",
        userId: user?.userId,
      });
      //getTimelinePosts();
      setIsPublicating(false);
      setAttTrending(attTrending+1);
    });

    promisse.catch((e) => {
      alert(e.response.data);
      setIsPublicating(false);
    });
  }

  const openModalRepost = () => setIsOpenedRepost(true);
  const closeModalRepost = () => setIsOpenedRepost(false);

  return (
    <>
    {isOpened? "" : isOpenedRepost?
    <Modal type="repost" isOpenedRepost={isOpenedRepost} setIsOpenedRepost={setIsOpenedRepost} closeModalRepost={closeModalRepost} bodyToRepost={bodyToRepost}/>: ""}
    <Wrapper>
      {" "}
      <h1 className="timeline__title">timeline</h1>
      <main className="container">
        <Publicate>
          <div>
            {" "}
            <img
              src={userInfo.pictureUrl}
              alt="postOwnerImage"
            />
          </div>

          <form onSubmit={publicate}>
            <label>What are you going to share today?</label>
            <input
              placeholder="http://..."
              name="url"
              onChange={handleNewPost}
              value={newPost.url}
              disabled={isPublicating}
            ></input>
            <textarea
              placeholder="Awesome article about #javascript"
              name="description"
              onChange={handleNewPost}
              value={newPost.description}
              disabled={isPublicating}
            ></textarea>
            <button type="submit" disabled={isPublicating}>{isPublicating ? " Publishing..." : "Publish"} </button>
          </form>
        </Publicate>
        {findPosts ? 
        ( <NewPosts onClick={loadNewPosts}>
           <p> {newsPosts} new posts, load more! <FiRefreshCcw/></p>
          </NewPosts>): 
          (<>
          </>) } 
        <div className="content">
          {loading ? (
            <div className="content__search">
              {" "}
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#333333"
                color="#151515"
              />
            </div>
          ) : posts.length === 0 ? (
            <div className="content__empty">{postMessage}</div>
          ) : (
            <>
            {posts.map((value, index) => (
              <Post
                key={index}
                name={value.name}
                description={value.description}
                image={value.image}
                urlInfo={value.urlInfo}
                url={value.url}
                id={value.id}
                userId={value.userId}
                reposterId={value.reposterId}
                originPostId={value.originPostId}
                openModalRepost={openModalRepost}
                setBodyToRepost={setBodyToRepost}
                newsPosts={newsPosts}
                setAttTrending={setAttTrending}
                attTrending={attTrending}
              />
            ))}
            </>
          )}
        </div>
      </main>
      <aside>
        <Trending attTrending={attTrending}/>
      </aside>
    </Wrapper>
    </>
  );
};

const NewPosts = styled.button`
width:100%;
height:61px;
background: #1877F2;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
margin-bottom:20px;
margin-top:20px;
display:flex;
justify-content:center;
align-items:center;
p{
  font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #FFFFFF;
}
`
const Publicate = styled.div`
  height: 20rem;
  width: 100%;
  border-radius: 1rem;
  background-color: white;
  margin-bottom: 3rem;
  display: flex;
  padding: 1rem;

  @media ${device.mobileM} {
    div {
      display: none;
    }
  }

  div {
    width: 10%;
    height: 100%;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label {
      font-size: 1.8rem;
      color: #707070;
      margin-bottom: 0.5rem;
    }
    input {
      border: none;
      height: 2rem;
      border-radius: 3px;
      margin-bottom: 0.5rem;
      background-color: #efefef;
      padding-left: 1rem;
      color: #949494;
      ::placeholder {
        font-size: 1rem;
      }
    }
    textarea {
      resize: none;
      border: none;
      min-height: 8rem;
      background-color: #efefef;
      padding-left: 1rem;
      padding-top: 1rem;
      color: #949494;
      box-sizing: border-box;
      ::placeholder {
        font-size: 1rem;
      }
    }
    button {
      border-radius: 4px;
      background-color: #1877f2;
      color: white;
      border: none;
      height: 2.5rem;
      width: 10rem;
      position: relative;
    }
  }

  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Wrapper = styled.div`
  width: 70vw;
  display: block;
  margin: 3rem auto 0 auto;
  position: relative;

  aside {
    width: 35%;
    position: absolute;
    top: 55px;
    right: 0;
  }

  @media ${device.mobileM} {
    margin: 0;
    width: 100%;
  }

  .container {
    width: 60%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "Lato", sans-serif;
    @media ${device.mobileM} {
      width: 100%;
    }
  }
  .content {
    &__search {
      display: flex;
      justify-content: center;
    }
    &__empty {
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
    }
  }

  .timeline__title {
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }
`;
