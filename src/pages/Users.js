import styled from "styled-components";
import TimelineUser from "../components/timelineUser/TimelineUser";
import { device } from "../mediaqueries/devices";
import Top from "./Top";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Modal from "./Modal.js";


export default function Users() {
  const { search, setSearch, isOpened } = useContext(UserContext);

  return (

    <Container onClick={() => { setSearch("") }}>
      {isOpened ?
        <>
          <Modal />
          <Top />
          <TimelineUser />
        </>
        :
        <>
          <Top />
          <TimelineUser />
        </>}
    </Container>
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