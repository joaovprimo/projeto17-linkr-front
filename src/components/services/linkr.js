import axios from "axios";

const BASE_URL = "http://localhost:4000";

function getPosts() {
  let promisse = axios.get(`${BASE_URL}posts`);
  return promisse;
}

export { getPosts };
