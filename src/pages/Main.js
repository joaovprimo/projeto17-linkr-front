import styled from "styled-components";
import Timeline from "../components/timeline/Timeline";
import { device } from "../mediaqueries/devices";
import Top from "./Top";


export default function Main() {

  return (
    <>
      <Container>
        <Top/>
        <Timeline />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 75px;
  width: 100vw;
  min-height: 100vh;
  background-color: #333333;
  @media ${device.mobileM} {
    max-width: 100%;
  }
`;

const Header = styled.div`
  width: 100vw;
  height: 75px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${device.mobileM} {
    max-width: 100vw;
    padding: 0 1rem;
  }
`;
const Logo = styled.h1`
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  color: #ffffff;
  margin-left: 25px;
  @media ${device.mobileM} {
    font-size: 30px;
    margin-left: 0;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  @media ${device.mobileM} {
    max-width: 100%;
  }
`;
const Photo = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 26.5px;
  margin-left: 15px;
  object-fit: cover;
`;

const InputSearch = styled.input`
  box-sizing: border-box;
  width: 563px;
  height: 45px;
  background: #ffffff;
  border-radius: 8px 0 0 8px;
  outline: none;
  border: 1px solid transparent;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  padding: 0 20px;
  color: black;
  @media ${device.mobileM} {
    max-width: 20px;
    height: 100%;
    ::placeholder {
      font-size: 15px;
    }
  }
  ::placeholder {
    color: #c6c6c6;
  }
`;
const DivSearch = styled.div`
  height: 45px;
  width: 60px;
  box-sizing: border-box;
  background: white;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media ${device.mobileM} {
    height: 25px;
    width: 20vw;
  }
`;
const Search = styled.div`
  display: flex;
  @media ${device.mobileM} {
    max-width: 100%;
  }
`;
