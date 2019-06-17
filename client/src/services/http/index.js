import axios from "axios";

//import { API_URL } from './config';
//const API_URL = process.env.REACT_APP_API_URL;

import { authRequest, authResponse } from "../interceptors/index";

const production = "https://enigmatic-tundra-96716.herokuapp.com";
const development = "http://localhost:5000";

const url = process.env.NODE_ENV ? production : development;

const http = axios.create({
  baseURL: url
});

http.interceptors.request.use(authRequest);
http.interceptors.response.use(...authResponse);

export default http;
