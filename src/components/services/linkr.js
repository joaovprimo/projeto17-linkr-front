import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getPosts() {
  let promisse = axios.get(`${BASE_URL}/posts`);
  return promisse;
}

async function postLogin(signin){
  const response = await axios.post(`${BASE_URL}/`,signin);
  return response;
}

export { getPosts, postLogin };
