import styled from "styled-components";

export default function Timeline() {
  return (
    <Wrapper>
      {" "}
      <h1 className="timeline__title">timeline</h1>
      <main className="container">
        <div className="publicate">
          <img src="https://br.mundo.com/fotos/201506/animal-selfie-1-600x400.jpg" />
          <form>
            <label>What are you going to share today?</label>
            <input placeholder="http://..."></input>
            <textarea placeholder="Awesome article about #javascript"></textarea>
            <button>Publish</button>
          </form>
        </div>
        <div className="content">
          <div className="content__post"></div>
          <div className=" content__post"></div>
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
  form {
    width: 80%;
    margin-left: 11vw;
    margin-top: 2vw;
    display: flex;
    flex-direction: column;
    min-height: 16rem;
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
      position: absolute;
      bottom: 0;
      right: 0rem;
      border-radius: 4px;
      background-color: #1877f2;
      color: white;
      border: none;
      height: 2.5rem;
      width: 10rem;
    }
  }
  h1 {
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }
  .container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "Lato", sans-serif;
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
  .content {
    &__post {
      height: 23rem;
      width: 100%;
      border-radius: 1rem;
      background-color: #171717;
      margin-bottom: 3rem;
    }
  }
`;
