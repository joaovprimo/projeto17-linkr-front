import styled from "styled-components";
import { device } from "../../mediaqueries/devices";
import UserContext from "../../context/UserContext.js";
import { useEffect, useState, useContext } from "react";
import Trending from "./Trending";
import { MagnifyingGlass } from "react-loader-spinner";
import Post from "./Post.js";
import { getTrendPosts } from "../../services/linkr";
import { useParams } from "react-router-dom";
import Top from "../../pages/Top.js";
import Modal from "../../pages/Modal.js";

export default function Trendpage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpened } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { hashtag } = useParams();

  useEffect(() => {
    const promisse = getTrendPosts(hashtag);
    promisse
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {isOpened ? (
        <>
          <Modal />
          <Top />
        </>
      ) : (
        <>
          <Top />
        </>
      )}
      <Wrapper>
        {" "}
        <h1 className="timeline__title">timeline</h1>
        <main className="container">
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
              <div className="content__empty">There are no posts yet</div>
            ) : (
              posts.map((value, index) => (
                <Post
                  key={index}
                  name={value.name}
                  description={value.description}
                  image={value.image}
                  urlInfo={value.urlInfo}
                  url={value.url}
                  id={value.id}
                  userId={value.userId}
                />
              ))
            )}
          </div>
        </main>
        <aside>
          <Trending />
        </aside>
      </Wrapper>
    </Container>
  );
}

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

const Container = styled.div`
  margin-top: 75px;
  width: 100vw;
  min-height: 100vh;
  background-color: #333333;
  @media ${device.mobileM} {
    max-width: 100%;
  }
`;
