import styled from "styled-components";
import { IoChevronDownOutline } from "react-icons/io5";
export default function Main(){
    return(
        <>
        <Container>
        <Header>
        <Logo>Linkr</Logo>
        <Profile>
        <IoChevronDownOutline style={{color: 'white', fontSize: '21px'}}/>
        <Photo src="https://i.pinimg.com/564x/79/95/eb/7995ebe5a61d943b171d33ac7c73921b.jpg" />
        </Profile>
        </Header>
        <Timeline>

        </Timeline>
        </Container>
        </>
    )
}


const Container=styled.div`
width:100vw;
height:100vh;
background-color:#333333;
`

const Header=styled.div`
width:100vw;
height:75px;
background-color:#151515;
display:flex;
align-items:center;
justify-content:space-between;
`
const Logo=styled.h1`
font-family: 'Passion One';
font-style: normal;
font-weight: 700;
font-size: 49px;
color:#FFFFFF;
margin-left:25px;
`
const Profile = styled.div`
display:flex;
align-items:center;
width:100px;
`
const Photo = styled.img`
width:55px;
height:55px;
border-radius: 26.5px;
margin-left:15px;
`

const Timeline = styled.div`

`