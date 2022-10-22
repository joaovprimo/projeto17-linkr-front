import { useContext, useEffect, useState } from "react";
import { MagnifyingGlass, ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../../context/UserContext.js";
import { device } from "../../mediaqueries/devices";
import { getPosts, postPublicate } from "../../services/linkr";
import Post from "./Post.js";
import Trending from "./Trending";

export default function Timeline() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    url: "",
    description: "",
    userId: "",
  });
  const [isPublicating, setIsPublicating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUser(userInfo);
      }
    }
  }, []);

  useEffect(() => {
    setNewPost({ ...newPost, userId: user?.userId });
  }, [user]);

  useEffect(() => {
    const promisse = getPosts();
    promisse.then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
    promisse.catch((error) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }, []);

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
      setIsPublicating(false);
    });

    promisse.catch((e) => {
      alert(e.response.data);
      setIsPublicating(false);
    });
  }

  return (
    <Wrapper>
      {" "}
      <h1 className="timeline__title">timeline</h1>
      <main className="container">
        <Publicate>
          <div>
            {" "}
            <img
              src="https://br.mundo.com/fotos/201506/animal-selfie-1-600x400.jpg"
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
            <button type="submit" disabled={isPublicating}>{isPublicating ?" Publishing..." : "Publish"} </button>
          </form>
        </Publicate>
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
              />
            ))
          )}
        </div>
      </main>
      <aside>
        <Trending />
      </aside>
    </Wrapper>
  );
}
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
