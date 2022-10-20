import styled from "styled-components";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import Timeline from "./timeline/Timeline";

export default function Main() {
  const [serach, setSearch] = useState("");
  console.log(Search);
  return (
    <>
      <Container>
        <Header>
          <Logo>Linkr</Logo>
          <Search>
            <InputSearch placeholder="Search for people "></InputSearch>{" "}
            <DivSearch>
              <BsSearch style={{ color: "#C6C6C6", fontSize: "23px" }} />
            </DivSearch>
            {/* <DebounceInput
              id="tags"
              minLength={3}
              debounceTimeout={300}
              style={styleInput}
              onChange={(e) => {
                setSearch(e.target.value);
                console.log(e.target.value);
              }}
            /> */}
          </Search>
          <Profile>
            <IoChevronDownOutline
              style={{ color: "white", fontSize: "21px" }}
            />
            <Photo src="https://i.pinimg.com/564x/79/95/eb/7995ebe5a61d943b171d33ac7c73921b.jpg" />
          </Profile>
        </Header>
        <Timeline />
      </Container>
    </>
  );
}

const styleInput = { width: "600px" };

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
`;

const Header = styled.div`
  width: 100vw;
  height: 75px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.h1`
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  color: #ffffff;
  margin-left: 25px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
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
`;
const Search = styled.div`
  display: flex;
`;
