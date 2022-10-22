import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LinkPreview from "./Linkpreview";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import { useEffect, useState,useContext } from "react";
import { getLikesPost, GetUser, postLike} from "../../services/linkr";
import UserContext from "../../context/UserContext";


export default function Post({ name, description, image, urlInfo, url,id }) {
  const [likesPost, setLikesPost] = useState("");

  
  const { tasks, setTasks, user, setUser } = useContext(UserContext);
  let likes,usr, indice, sec, first, tamanho, lisklength;
 useEffect(()=> {
  getLikesPost(id).then((resp)=> {
  console.log(resp.data);   
    setLikesPost(resp.data)
  }).catch(()=>console.log("nada"));

  GetUser(tasks.userId).then((resp)=>{
    console.log(resp.data);
    setUser(resp.data.username)
  }).catch((err)=>console.log(err.message))
 }, []);

function likePost(id){
  postLike(id, tasks.userId).then((resp)=>{
    setLikesPost(resp.data)
  }).catch((err)=>console.log(err.message))
}

 if(typeof likesPost === "object"){
  likes = likesPost.map(lik=>lik.username);
  console.log(likes)
  lisklength = likes.length;
  let find = (likes.filter((ele)=>ele === user))
  console.log(find)
  if(find.length>0){
    indice = likes.indexOf(user);
    usr = user;
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
        <div className="content__buttons">
          <h2 className="content__name"> {name}</h2>
          <div>
            <TbEdit color="white" size={20} />
            <AiOutlineDelete color="white" size={20} />
          </div>
        </div>

        <p className="content__description">{description}</p>
        <LinkPreview url={url} urlInfo={urlInfo} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 26rem;
  width: 100%;
  border-radius: 1rem;
  background-color: #171717;
  padding: 1.5rem;
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  .content {
    width: 100%;
    min-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__buttons {
      display: flex;
      justify-content: space-between;
    }
    &__name {
      font-size: 2rem;
      color: white;
    }
    &__description {
      font-size: 1.3rem;
      color: #b7b7b7;
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
