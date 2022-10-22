import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LinkPreview from "./Linkpreview";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { device } from "../../mediaqueries/devices.js";

export default function Post({ name, description, image, urlInfo, url }) {
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
        <div className="content__headers">
        <div className="content__headers-buttons">
          <h2 className="content__headers-name"> {name}</h2>
          <div>
            <TbEdit color="white" size={20} />
            <AiOutlineDelete color="white" size={20} />
          </div>
        </div>

        <p className="content__headers-description">{description}</p>
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
    &__headers{
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
