import axios from "axios";
import { accessToken } from "./auth-header";

const PRODUCT_API_URL = "http://localhost:8080/api/products";

export function postProduct(data) {
  return axios.post(PRODUCT_API_URL, data, {
    headers: {
      Authorization: accessToken(),
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getAllProduct() {
  return axios.get(PRODUCT_API_URL);
}
