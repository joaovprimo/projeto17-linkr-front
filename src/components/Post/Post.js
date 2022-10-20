import styled from "styled-components";

export default function Post() {
  return (
    <Wrapper>
      <div className="profilePic">
        <img
          src="https://br.mundo.com/fotos/201506/animal-selfie-1-600x400.jpg"
          alt="profilePost"
        />
      </div>

      <div className="content">
        <h2 className="content__name"> Juvenal Juvencio</h2>
        <p className="content__description">
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
        </p>
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
  padding: 2rem;
  position: relative;
  display: flex;
  .profilePic {
    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .content {
    background-color: red;
    width: 100%;
    min-height: 90%;
    display: flex;
    flex-direction: column;
  }
`;
