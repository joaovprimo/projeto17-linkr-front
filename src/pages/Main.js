import styled from "styled-components";
import Timeline from "../components/timeline/Timeline";
import { device } from "../mediaqueries/devices";
import Top from "./Top";


export default function Main() {
<<<<<<< HEAD
  const [search, setSearch] = useState("");
  console.log(search);
=======

>>>>>>> main
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