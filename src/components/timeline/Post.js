import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LinkPreview from "./Linkpreview";

export default function Post({ name, description, image, urlInfo }) {
  return (
    <Wrapper>
      <div className="profilePic">
        <img src={image} alt="profilePost" />
        <div>
          <AiOutlineHeart color="white" size={20} />
          <h4>13 likes</h4>
        </div>
      </div>

      <div className="content">
        <h2 className="content__name"> {name}</h2>
        <p className="content__description">{description}</p>
        <LinkPreview urlInfo={urlInfo} />
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
