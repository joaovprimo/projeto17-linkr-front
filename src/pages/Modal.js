import styled from "styled-components";
import {useContext} from "react";
import UserContext from "../context/UserContext";
import { deletePost } from "../services/linkr";
import { RotatingLines } from "react-loader-spinner";

export default function Modal (){
    const {isOpened, setIsOpened, idPost, setIdPost,  loading, setLoading } = useContext(UserContext);
    const closeModal = ()=>setIsOpened(false);
    console.log(idPost)
    function deletingPost(){
       const promisse = deletePost(idPost);
       setLoading(true);
       promisse.then(()=>{
            setLoading(false)
            closeModal()
        }).catch(()=>{
            setLoading(false)
            closeModal()
            alert("Could not delete post")
        })
    }

    return(
        <>
        <ModalBackground>
        <Container>
        <Header>
          <Title>
            <p>Are you sure you want to delete this post?</p>
            </Title>
        </Header>
        <Footer>
            {loading? 
            <>
            <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
            </> 
            :
             <>
            <Button1 variant="secondary" onClick={closeModal}>
                <p>No, go back</p>
            </Button1>
            <Button2 variant="primary" onClick={deletingPost}>
                <p>Yes, delete it</p>
            </Button2>
            </>}
          
          </Footer>
          </Container>
          </ModalBackground>
        </>
    )
}

const Button1 = styled.button`
width: 134px;
height: 37px;
left: 572px;
top: 508px;
color: #1877F2;
background: #FFFFFF;
border-radius: 5px;
p{
  font-weight: 700;
font-size: 18px;
}
`
const Button2 = styled.button`
width: 134px;
height: 37px;
left: 572px;
top: 508px;
color: #FFFFFF;
background: #1877F2;
border-radius: 5px;
margin-left:30px;
d
p{
  font-weight: 700;
font-size: 18px;
}
`
const ModalBackground =  styled.div`
width:100vw;
height:100vh;
background-color:rgba(255, 255, 255, 0.9);
display:flex;
justify-content:center;
align-items:center;
position:absolute;
z-index:3
`
const Container = styled.div`
width:597px;
height:262px;
background-color: #333333;
border-radius: 50px;
display:flex;
flex-direction:column;
`
const Header = styled.div`
display:flex;
justify-content:center;
align-items:center;
`

const Title = styled.div`
display:inline-block;
text-align:center;
margin-top:38px;
width:338px;
height:82px;
p{
    font-family: 'Lato';
    color:white;
    font-weight: 700;
font-size: 34px;
}
`
const Footer = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-top:40px;
`
