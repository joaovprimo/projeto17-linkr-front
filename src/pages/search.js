import styled from "styled-components";
import { device } from "../mediaqueries/devices";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import Top from "./Top";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const { searchs, setSearchs } = useContext(UserContext);
    const navigate=useNavigate();
    console.log( searchs );
return (
    <>
      <Container>
        <Top/>
        <DivUsers>
            {searchs.map((e)=>(
                        <DivUser onClick={()=>{navigate(`/user/${e.id}`)}}>
                        <img src={e.pictureUrl}/>
                            <h1>{e.username}</h1>
                        </DivUser>
            ))}
        </DivUsers>
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
const DivUsers=styled.div`
    display:flex;
    justify-content:center;
    padding: 30px;
`;
const DivUser=styled.div`
    width: 611px;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display:flex;
    align-items:center;
    padding: 0 15px;
    img{
        width:65px;
        heigth:65px;
        border-radius:100%;
    }h1{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        margin-left: 20px;
    }
`