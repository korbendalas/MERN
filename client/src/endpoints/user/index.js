import toResponse from "@toResponse";
import http from "@services/http";

export const registerUser = credentials =>
  toResponse(http.post("/api/users/register", credentials));

export const loginUser = credentials =>
  toResponse(http.post("/api/users/login", credentials));

export const getCurrentProfile = () => toResponse(http.get("/api/profile"));

export const createCurrentProfile = credentials =>
  toResponse(http.post("/api/profile", credentials));

export const deleteCurrentProfile = () =>
  toResponse(http.delete("/api/profile"));

export const addExperience = credentials =>
  toResponse(http.post("/api/profile/experience", credentials));

export const addEducation = credentials =>
  toResponse(http.post("/api/profile/education", credentials));

export const deleteExperience = id =>
  toResponse(http.delete(`api/profile/experience/${id}`));

export const deleteEducation = id =>
  toResponse(http.delete(`/api/profile/education/${id}`));

//Public
export const getAllProfiles = () => toResponse(http.get("api/profile/all"));
//Public
export const getProfilePublic = id =>
  toResponse(http.get(`api/profile/user/${id}`));
