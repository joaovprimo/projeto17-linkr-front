import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { device } from "../../mediaqueries/devices";

const ranking = [
  "javascript",
  "react",
  "css",
  "python",
  "django",
  "c++",
  "ruby",
  "pascal",
  "mobile",
  "sql",
  "a",
  "b",
  "x",
  "c",
];

export default function Trending() {
  return (
    <Wrapper>
      <h1>trending</h1>
      <div className="divisor"></div>
      <ul>
        {ranking.map((e, i) => {
          return (
            <li key={i}>
              <p># {e}</p>
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
    display: none
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
