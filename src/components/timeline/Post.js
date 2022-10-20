import styled from "styled-components";

export default function Post({ name, description }) {
  return (
    <Wrapper>
      <div className="profilePic">
        <img
          src="https://br.mundo.com/fotos/201506/animal-selfie-1-600x400.jpg"
          alt="profilePost"
        />
      </div>

      <div className="content">
        <h2 className="content__name"> {name}</h2>
        <p className="content__description">{description}</p>
        <div className="content__linkPreview"></div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 26rem;
  width: 100%;
  border-radius: 1rem;
  background-color: #171717;
  padding: 1.5rem;
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  .profilePic {
    width: 10%;
    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .content {
    width: 100%;
    min-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__name {
      font-size: 2rem;
      color: white;
    }
    &__description {
      font-size: 1.3rem;
      color: #b7b7b7;
    }
    &__linkPreview {
      min-height: 70%;
      border: 1px solid grey;
      border-radius: 6px;
    }
  }
`;
