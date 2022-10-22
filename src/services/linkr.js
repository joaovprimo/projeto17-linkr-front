import axios from "axios";

const BASE_URL = "http://localhost:4000";

function createHeaders() {
  const config = JSON.parse(localStorage.getItem("userInfo"));
  return config;
}

function getPosts() {
  const headers = createHeaders();
  let promisse = axios.get(`${BASE_URL}/posts`, headers);
  return promisse;
}

function postPublicate(body) {
  const headers = createHeaders();
  const promisse = axios.post(`${BASE_URL}/posts`, body, headers);
  return promisse;
}

async function postLogin(signin) {
  const response = await axios.post(`${BASE_URL}/`, signin);
  return response;
}

async function postSignup(signin) {
  const response = await axios.post(`${BASE_URL}/sign-up`, signin);
  return response;
}

function getUserSearch(search){
  return axios.get(`${BASE_URL}/search?search=${search}`);
}

async function getUserInfo(token){
  const config = {
    headers: token
  }
  const response = await axios.get(`${BASE_URL}/userinfo`,config);
  return response;
}

async function logoutUser(token) {
  const config = {
    headers: token
  }
  const response = await axios.post(`${BASE_URL}/logout`,"", config);
  return response;
}

export { getPosts, postLogin, postSignup, postPublicate, getUserSearch, getUserInfo, logoutUser};
