import axios from "axios";

const BASE_URL = "http://localhost:5000";

function getPosts() {
  let promisse = axios.get(`${BASE_URL}/posts`);
  return promisse;
}

function postPublicate(body) {
  const promisse = axios.post(`${BASE_URL}/posts`, body);
  return promisse;
}

async function postLogin(signin) {
  const response = await axios.post(`${BASE_URL}/`, signin);
  return response;
}

async function postSignup(signin) {
  console.log(signin)
  const response = await axios.post(`${BASE_URL}/sign-up`, signin);
  return response;
}

async function getLikesPost(id){
  const response =  await axios.get(`${BASE_URL}/posts/likes/${id}`);
  return response;
}

async function GetUser(id){
  const response =  await axios.get(`${BASE_URL}/user/${id}`);
return response
}

async function postLike(id, idusr){
  const response =  await axios.post(`${BASE_URL}/posts/likes/${id}/${idusr}`);
return response
}

export { getPosts, postLogin, postSignup, postPublicate, getLikesPost, GetUser, postLike};
