import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://54.37.234.255:8085/user/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  // getUserBoard() {
  //   return axios.get(API_URL + "user", {}, { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + "admin", {}, { headers: authHeader() });
  // }

  addFavouritesPlaces(body) {
    console.log(authHeader());
    return axios
      .post(API_URL + "favourites", body, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deletePlaceFromFavouriteList(body) {
    let config = { headers: authHeader() };
    config.data = body;
    return axios.delete(API_URL + "favourites", config).then((response) => {
      return response.data;
    });
  }

  getFavouritePlaces() {
    return axios.get(API_URL + "favourites", { headers: authHeader() });
  }
}

export default new UserService();
