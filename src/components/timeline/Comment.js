import styled from "styled-components";

export default function Comment({ comment }) {
  return (
    <>
      <Container>
        <div className="leftside">
          <img src={comment.pictureUrl} alt="userimage"></img>
        </div>
        <div className="rightside">
          <h1>{comment.username}</h1>
          <p>{comment.comment}</p>
        </div>
      </Container>
      <Divisor></Divisor>
    </>
  );
}

const Container = styled.main`
  margin-top: 10px;

  width: 100%;
  display: flex;
  .leftside {
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rightside {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
  }

  img {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    object-fit: fill;
  }
`;

const Divisor = styled.div`
  height: 1px;
  width: 100%;
  color: #484848;
  background-color: #353535;
`;
