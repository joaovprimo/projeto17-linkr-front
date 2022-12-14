import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { device } from "../../mediaqueries/devices";
import { getTrendRanking } from "../../services/linkr";
import { useNavigate } from "react-router-dom";

export default function Trending({attTrending}) {
  const [trends, setTrends] = useState([]);

  useEffect(()=>{
    const promisse = getTrendRanking();
    promisse.then((res) => {
      console.log(res.data);
      setTrends(res.data);
    });
  },[attTrending])

  const navigate = useNavigate();

  return (
    <Wrapper>
      <h1>trending</h1>
      <div className="divisor"></div>
      <ul>
        {trends.map((e, i) => {
          return (
            <li key={i}>
              <p onClick={() => navigate(`/hashtag/${e.name}`)}># {e.name}</p>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 301px;
  color: #ffffff;
  font-family: "Lato", sans-serif;
  background-color: #171717;
  border-radius: 16px;
  @media ${device.mobileM} {
    display: none;
  }
  h1 {
    font-size: 27px;
    font-weight: bold;
    padding-top: 9px;
    margin: 0px 0px 12px 16px;
  }
  .divisor {
    height: 1px;
    width: 302px;
    background-color: #484848;
    margin-bottom: 22px;
  }
  ul {
    margin-left: 16px;
    font-size: 19px;
  }
  li {
    padding-bottom: 8px;
    cursor: pointer;
  }
`;
