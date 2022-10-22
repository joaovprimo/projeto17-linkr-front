import styled from "styled-components";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { device } from "../../mediaqueries/devices";

export default function LinkPreview({ urlInfo, url }) {
  if(urlInfo === undefined) urlInfo = {title: "Link quebrado", description: "Link quebrado, refaça a postagem", canonical: "",image: "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"}

  return (
    <Wrapper onClick={() => window.open(url)}>
      <div className="left">
        <h1>{urlInfo.title}</h1>

        <h2>{urlInfo.description}</h2>
        <h3>{urlInfo.canonical}</h3>
      </div>
      <div className="right">
        <img src={urlInfo.image} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 70%;
  max-height: 70%;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: space-between;
  transition: all 0.5s;
  

  @media ${device.mobileM} {
    width: 100%;
  }
  :hover {
    transform: scale(1.05);
    box-shadow: 0 0.4rem 0.4rem 0.5rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
  :active {
    transform: translateY(1px);
  }

  .left {
    padding: 2rem;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    border-bottom: 1px solid grey;
    max-width: 100%;
    min-width: 65%;
    overflow: hidden;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media ${device.mobileM} {
      min-width: 70%;
    }
  }
  h1 {
    font-size: 1.5rem !important;
    margin: 0;
    color: #cecece;
    @media ${device.mobileM} {
      font-size: 1rem !important;
    }
  }
  h2 {
    font-size: 1.2rem;
    color: #9b9595;
    @media ${device.mobileM} {
      font-size: .8rem !important;
    }
  }
  h3 {
    font-size: 1.2rem;
    color: #cecece;
    max-width: 100%;
    @media ${device.mobileM} {
      font-size: .8rem !important;
    }
  }
  .right {
    width: 25rem;
    height: 100%;
    @media ${device.mobileM} {
      width: 20rem;
    }

    img {
      border-radius: 6px;
      margin-left: -1rem;
      min-width: 100%;
      height: 100%;
      object-fit: cover;
      @media ${device.mobileM} {
      object-fit: scale-down;
    }
      
    }
  }
`;
