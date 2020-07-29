import React, { Component } from "react";

import UserService from "../services/user.service";
import UserFavouritePlaces from "./user-favourite-places.component";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      favPlacesList: [],
      showFavouritePlaces: false,
    };
  }
  componentDidMount() {
    UserService.getFavouritePlaces().then(
      (response) => {
        console.log(response.data);
        this.setState((prevState) => ({
          favPlacesList: response.data,
        }));
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handleDelete = (body) => {
    console.log(body);
    UserService.deletePlaceFromFavouriteList(body);

    let bufor = this.state.favPlacesList.filter((m) => m.id !== body.id);

    this.setState({
      favPlacesList: bufor,
    });
  };
  handleClickShowFavouritePlaces = () => {
    this.setState((prevState) => ({
      showFavouritePlaces: !prevState.showFavouritePlaces,
    }));
  };

  render() {
    const { showFavouritePlaces } = this.state;
    return (
      <div class="d-flex    flex-wrap flex-md-nowrap align-items-top pt-1 pb-2 mb-3 border-bottom w-100 bg-light">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse "
        >
          <div className="pt-3">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-top mt-0 mb-1 text-muted">
              <span>User</span>
            </h6>
            <ul
              className="nav flex-column"
              onClick={this.handleClickShowFavouritePlaces}
            >
              <li className="nav-item ml-3">Favourite places</li>
            </ul>
          </div>
        </nav>
        {showFavouritePlaces ? (
          <UserFavouritePlaces
            favPlacesList={this.state.favPlacesList}
            handleDelete={this.handleDelete}
          />
        ) : null}
      </div>
    );
  }
}
