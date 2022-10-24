import styled from "styled-components";
import TimelineUser from "../components/timelineUser/TimelineUser";
import { device } from "../mediaqueries/devices";
import Top from "./Top";


export default function Users() {
return (
    <>
      <Container>
        <Top/>
        <TimelineUser />
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