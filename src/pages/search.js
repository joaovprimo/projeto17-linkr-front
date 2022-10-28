import styled from "styled-components";
import { device } from "../mediaqueries/devices";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import Top from "./Top";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const { searchs, setSearchs } = useContext(UserContext);
    const { search, setSearch } = useContext(UserContext);
    const navigate=useNavigate();
return (
    <>
      <Container onClick={()=>{setSearch("")}}>
        <Top/>
        <DivUsers>
            {(searchs===undefined || searchs.length===0)? 
            <h3>No user found</h3>
             : 
            searchs.map((e)=>(
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
    flex-direction:column;
    justify-content:center;
    align-items: center;
    padding: 30px;
    h3{
        font-size: 40px;
        color:white;
        margin-top: 40px;
    };
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
    margin-bottom:20px;
    cursor: pointer;
    @media ${device.mobileM} {
        max-width: 70%;
    }
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