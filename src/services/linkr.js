import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const BASE_URL = "http://localhost:5000";

function createHeaders() {
  const config = JSON.parse(localStorage.getItem("userInfo"));
  return config;
};

function getPosts() {
  const headers = createHeaders();
  let promisse = axios.get(`${BASE_URL}/posts`, headers);
  return promisse;
};

function getTrendRanking() {
  let promisse = axios.get(`${BASE_URL}/ranking`);
  return promisse;
}

function getTrendPosts(hashtagName) {
  console.log("oi");
  let promisse = axios.get(`${BASE_URL}/hashtag/${hashtagName}`);
  return promisse;
}

function postPublicate(body) {
  const headers = createHeaders();
  const promisse = axios.post(`${BASE_URL}/posts`, body, headers);
  return promisse;
};

async function postLogin(signin) {
  const response = await axios.post(`${BASE_URL}/`, signin);
  return response;
};

async function postSignup(signin) {
  console.log(signin);
  const response = await axios.post(`${BASE_URL}/sign-up`, signin);
  return response;
};

async function getLikesPost(id) {
  const response = await axios.get(`${BASE_URL}/posts/likes/${id}`);
  return response;
};

async function GetUser(id) {
  const response = await axios.get(`${BASE_URL}/user/${id}`);
  return response;
}

async function postLike(id, idusr) {
  const headers = createHeaders();
  const response = await axios.post(`${BASE_URL}/posts/likes/${id}/${idusr}`, headers);
  return response;
}

function getUserSearch(search,token){
  const config = {
    headers: token
  };   
  return axios.get(`${BASE_URL}/search?search=${search}`,config);
};

async function getUserInfo(token) {
  const config = {
    headers: token,
  };
  const response = await axios.get(`${BASE_URL}/userinfo`, config);
  return response;
};

async function logoutUser(token) {
  const config = {
    headers: token,
  };
  const response = await axios.post(`${BASE_URL}/logout`, "", config);
  return response;
};

function getUserId(id,token){
  const config = {
    headers: token
  };
  return axios.get(`${BASE_URL}/search/${id}`,config);
};
function getNameUser(id,token){
  const config = {
    headers: token
  };
  return axios.get(`${BASE_URL}/name/${id}`,config);
};

async function deletePost(id) {
  const headers = createHeaders();
  const response = await axios.delete(`${BASE_URL}/posts/${id}`, headers);
  return response;
}
function getAllUserSearch(search,token){
  const config = {
    headers: token
  };   
  return axios.get(`${BASE_URL}/searchs?search=${search}`,config);
};

async function editPost(id,description){
  const headers = createHeaders();
  const response = await axios.post(`${BASE_URL}/posts/edit/${id}`, description, headers);
  return response;
}

async function getIsFollowed(userId){
  const config = createHeaders();
  const response = await axios.get(`${BASE_URL}/isFollowed/${userId}`,config);
  return response;
}

async function updateFollowUnfollow(userId){
  const config = createHeaders();
  const response = await axios.get(`${BASE_URL}/followUnfollow/${userId}`,config);
  return response;  
}

export { 
  getPosts, 
  postLogin, 
  postSignup, 
  postPublicate, 
  getUserSearch, 
  getUserInfo, 
  logoutUser, 
  getLikesPost, 
  GetUser, 
  postLike, 
  deletePost,
  editPost,
  getTrendPosts, 
  getTrendRanking,
  getAllUserSearch,
  getNameUser,
  getUserId,
  getIsFollowed,
  updateFollowUnfollow
  };


