import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://54.37.234.255:8085/admin";

class AdminService {
  addCategory(body) {
    console.log(authHeader());
    return axios
      .post(API_URL + "/categories/add", body, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  changeVisibility(id) {
    console.log(authHeader());
    return axios
      .post(API_URL + "/categories/" + id, {}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new AdminService();
