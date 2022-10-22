import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LinkPreview from "./Linkpreview";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { device } from "../../mediaqueries/devices.js";
import ReactTooltip from "react-tooltip";
import { useEffect, useState,useContext } from "react";
import { getLikesPost, GetUser, postLike} from "../../services/linkr";
import UserContext from "../../context/UserContext";
import Modal from '../../pages/Modal';



export default function Post({ name, description, image, urlInfo, url,id }) {
  const [likesPost, setLikesPost] = useState("");
  const [userr, setUserr] = useState("");
  

const openModal = ()=>{setIdPost(id)
  setIsOpened(true)};

  const { user, setUser, isOpened, setIsOpened, idPost, setIdPost } = useContext(UserContext);
  let likes,usr, indice, sec, first, tamanho, lisklength;
 useEffect(()=> {
  getLikesPost(id).then((resp)=> {
  console.log(resp.data);   
    setLikesPost(resp.data)
  }).catch(()=>console.log("nada"));

  GetUser(user?.userId).then((resp)=>{
    console.log(resp.data);
    setUserr(resp.data.username)
  }).catch((err)=>console.log(err.message))
 }, []);

function likePost(id){
  postLike(id, user.userId).then((resp)=>{
    setLikesPost(resp.data)
  }).catch((err)=>console.log(err.message))
}

 if(typeof likesPost === "object"){
  likes = likesPost.map(lik=>lik.username);
  console.log(likes)
  lisklength = likes.length;
  let find = (likes.filter((ele)=>ele === userr))
  console.log(find)
  if(find.length>0){
    indice = likes.indexOf(userr);
    usr = userr;
    if(indice+1>=likes.length){
      console.log("aqui1")
      sec =(likes[indice-1]);
    }else{
      console.log("aqui2")
      sec =(likes[indice+1])
    }
    
  }else{
    first =(likes[0]);
    sec = likes[1];
    
  }
  if( likes.length-2<0){
    tamanho = 0;
  }else{
    tamanho = (likes.length-2);
  }
 }

  return (
    <Wrapper>
      <div className="profilePic">
        <img src={image} alt="profilePost" />
        <div>
          {usr ? 
          <>
           <AiFillHeart color="red" size={20} data-for="main" data-tip={`${user}, ${sec} e outras ${tamanho} pessoas`} data-iscapture="true" onClick={()=>likePost(id)}/>
          <h4 data-for="main" data-tip={`${user}, ${sec} e outras ${tamanho} pessoas`} data-iscapture="true">{lisklength}</h4> </> 
          :
          <>
           <AiFillHeart color="white" size={20} data-for="main" data-tip={`${first}, ${sec} e outras ${tamanho} pessoas`} data-iscapture="true" onClick={()=>likePost(id)}/>
          <h4 data-for="main" data-tip={`${first}, ${sec} e outras ${tamanho} pessoas`} data-iscapture="true">{lisklength}</h4>
          </>}
          <ReactTooltip id="main" place={"bottom"} type={"light"} effect={"float"} multiline={"true"}/>
        </div>
      </div>

      <div className="content">
        <div className="content__headers">
        <div className="content__headers-buttons">
          <h2 className="content__headers-name"> {name}</h2>
          <div>
            <TbEdit color="white" size={20} />
            <AiOutlineDelete color="white" size={20} onClick={openModal}/>
          </div>
        </div>

        <p className="content__headers-description">{description}</p>
        </div>
        <LinkPreview url={url} urlInfo={urlInfo} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
min-height: 25vh;
  min-width: 100%;
  max-width: 100%;
  border-radius: 1rem;
  background-color: rgba(23, 23, 23, 0.95);
  padding: 1.5rem;
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  @media ${device.mobileM} {
    max-width: 100vw;
    overflow: scroll;
  }
  .content {
    min-width: 100%;
    min-width: 90%;
    min-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media ${device.mobileM} {
      max-width: 80vw;
    }
    &__headers{
display: flex;
flex-direction: column;
min-height: 6vh;
justify-content: space-around;
max-width: 100%;
word-break: break-all;
      &-buttons {
      display: flex;
      justify-content: space-between;
    }
    &-name {
      font-size: 2rem;
      color: white;
      @media ${device.mobileM} {
      font-size: 1.5rem;
    }
    }
    &-description {
      font-size: 1.3rem;
      color: #b7b7b7;
      margin: 1rem 0;
    }
    }

    
  }
  .profilePic {
    margin-left: -0.5rem;
    margin-right: 1rem;
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 10rem;
    
    h4 {
      color: white;
    }
    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
