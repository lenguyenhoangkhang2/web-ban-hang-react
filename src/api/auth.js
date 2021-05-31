import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
import axiosClient from "./axiosClient";
import request from "./axiosClient";

const AuthApi = {
  getCurrentUser: () => {
    return axiosClient.get("/user/me");
  },

  login: (email, password) => {
    return axiosClient.post("/auth/login", {
      email: email,
      password: password,
    });
  },

  signup: (name, email, password) => {
    return axiosClient.post("/auth/signup", {
      name: name,
      email: email,
      password: password,
    });
  },
};

export function getCurrentUser() {
  return axios.get(API_BASE_URL + "/user/me");
}

export function login(email, password) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    data: {
      email: email,
      password: password,
    },
  });
}

export function signup(name, email, password) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
}

export default AuthApi;
