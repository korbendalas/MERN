import store from "@/store";

export function authRequest(config) {
  const token = localStorage.getItem("access_token");
  //console.log("is token sent", token);
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}

export const authResponse = [
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      store.dispatch({ type: "DEAUTHENTICATE_USER" });
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
];
