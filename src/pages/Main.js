import styled from "styled-components";
import Timeline from "../components/timeline/Timeline";
import { device } from "../mediaqueries/devices";
import Top from "./Top";
import {useContext} from "react";
import UserContext from "../context/UserContext";
import Modal from "./Modal"


export default function Main() {
  const {isOpened, setIsOpened } = useContext(UserContext);
  const { search, setSearch } = useContext(UserContext);
  
  
return (
    <>
      <Container onClick={()=>{setSearch("")}}>
        {isOpened? 
        <>
        <Modal/>
        <Top/>
        <Timeline />
        
        </>
        : 
        <>
        <Top/>
        <Timeline />
        </>}
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

