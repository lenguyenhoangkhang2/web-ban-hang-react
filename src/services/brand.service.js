import axios from "axios";
import { authHeader } from "./auth-header";

const BRAND_API_URL = "http://localhost:8080/api/brands";

class BrandService {
  findAllBrand() {
    return axios.get(BRAND_API_URL);
  }

  findByBrandId(id) {
    return axios.get(BRAND_API_URL + "/" + id);
  }

  findByBrandName(term) {
    return axios.get(BRAND_API_URL, {
      params: {
        query: term,
      },
    });
  }

  addBrand() {
    return axios.get(BRAND_API_URL, { headers: authHeader() });
  }

  deleteBrand() {
    return axios.get(BRAND_API_URL, { headers: authHeader() });
  }
}
export default new BrandService();
