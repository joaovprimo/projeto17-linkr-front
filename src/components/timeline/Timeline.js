import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts, postPublicate } from "../../services/linkr";
import Post from "./Post.js";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    url: "",
    description: "",
    userId: 1,
  });
  console.log(posts);

  useEffect(() => {
    const promisse = getPosts();
    promisse.then((res) => setPosts(res.data));
  }, []);

  function handleNewPost(e) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }
  function publicate(e) {
    e.preventDefault();
    const promisse = postPublicate(newPost);
    promisse.then((res) => {
      alert("Post publicado com sucesso");
      console.log(res);
    });

    promisse.catch((e) => console.log(e));
  }

  return (
    <Wrapper>
      {" "}
      <h1 className="timeline__title">timeline</h1>
      <main className="container">
        <div className="publicate">
          <img
            src="https://br.mundo.com/fotos/201506/animal-selfie-1-600x400.jpg"
            alt="postOwnerImage"
          />
          <form onSubmit={publicate}>
            <label>What are you going to share today?</label>
            <input
              placeholder="http://..."
              name="url"
              onChange={handleNewPost}
              value={newPost.url}
            ></input>
            <textarea
              placeholder="Awesome article about #javascript"
              name="description"
              onChange={handleNewPost}
              value={newPost.description}
            ></textarea>
            <button type="submit">Publish</button>
          </form>
        </div>
        <div className="content">
          {posts.map((value, index) => (
            <Post
              key={index}
              name={value.name}
              description={value.description}
              image={value.image}
              urlInfo={value.urlInfo}
            />
          ))}
        </div>
      </main>
      <aside></aside>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 70vw;
  display: block;

  margin: 3rem auto 0 auto;
  position: relative;

  .container {
    width: 60%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "Lato", sans-serif;
  }

  form {
    width: 85%;
    min-height: 80%;
    margin-left: 10%;
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

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
    }
  }
  .timeline__title {
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }

  .publicate {
    height: 20rem;
    width: 100%;
    border-radius: 1rem;
    background-color: white;
    margin-bottom: 3rem;
    position: relative;
    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      position: absolute;
      top: 2rem;
      left: 2rem;
      border-radius: 50%;
    }
  }
`;
