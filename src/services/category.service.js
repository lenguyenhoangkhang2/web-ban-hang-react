import axios from "axios";
import { authHeader } from "./auth-header";

const CATEGORY_API_URL = "http://localhost:8080/api/categories";

class CategoryService {
  findAllCategory() {
    return axios.get(CATEGORY_API_URL);
  }

  findByCategoryId(id) {
    return axios.get(CATEGORY_API_URL + "/" + id);
  }

  findByCategoryName(term) {
    return axios.get(CATEGORY_API_URL, {
      params: {
        query: term,
      },
    });
  }

  addCategory() {
    return axios.get(CATEGORY_API_URL, { headers: authHeader() });
  }

  deleteCategory() {
    return axios.get(CATEGORY_API_URL, { headers: authHeader() });
  }
}
export default new CategoryService();
