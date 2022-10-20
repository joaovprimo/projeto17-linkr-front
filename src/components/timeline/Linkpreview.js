import styled from "styled-components";

export default function LinkPreview({ urlInfo }) {
  return (
    <Wrapper>
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

  .left {
    padding: 2rem;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    border-bottom: 1px solid grey;
    width: 100%;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  h1 {
    font-size: 1.5rem !important;
    margin: 0;
    color: #cecece;
  }
  h2 {
    font-size: 1.2rem;
    color: #9b9595;
  }
  h3 {
    font-size: 1.2rem;
    color: #cecece;
  }
  .right {
    width: 25rem;
    height: 100%;

    img {
      border-radius: 6px;
      margin-left: -1rem;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
