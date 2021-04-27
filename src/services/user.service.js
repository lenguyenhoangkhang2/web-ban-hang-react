import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "test/all");
  }

  getUserBoard() {
    return axios.get(API_URL + "test/user", { headers: authHeader() });
  }

  getClerkBoard() {
    return axios.get(API_URL + "test/clerk", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "test/admin", { headers: authHeader() });
  }
}

export default new UserService();
