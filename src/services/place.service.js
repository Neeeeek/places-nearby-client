import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://host:8085/";

class PlaceService {
  getPlaces(body) {
    console.log(authHeader());
    return axios
      .post(API_URL + "places", body, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getCategories() {
    return axios.get(API_URL + "places/categories");
  }
}

export default new PlaceService();
