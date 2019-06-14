import { AUTH_TOKEN } from "./config";

//set token
export const authenticate = access_token => {
  localStorage[AUTH_TOKEN] = access_token;
};
//gets token
export const getToken = () => localStorage[AUTH_TOKEN];
