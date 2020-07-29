import React, { Component } from "react";

import PlaceService from "../services/place.service";
import AdminCategories from "./admin-categories.component";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      categories: "",
      showCategories: false,
    };
  }

  handleShowCategories = () => {
    if (!this.state.showCategories) {
      PlaceService.getCategories().then(
        (response) => {
          console.log(response.data);
          this.setState((prevState) => ({
            categories: response.data,
            showCategories: !prevState.showCategories,
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
    } else {
      this.setState((prevState) => ({
        showCategories: !prevState.showCategories,
      }));
    }
  };
  render() {
    const { showCategories } = this.state;
    return (
      <div class="d-flex   flex-wrap flex-md-nowrap align-items-top pt-1 pb-2 mb-3 border-bottom bg-light">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse "
        >
          <div className="pt-3">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-top mt-0 mb-1 text-muted">
              <span>Admin</span>
            </h6>
            <ul className="nav flex-column" onClick={this.handleShowCategories}>
              <li className="nav-item ml-3">Categories</li>
            </ul>
          </div>
        </nav>

        {showCategories ? (
          <AdminCategories categories={this.state.categories} />
        ) : null}
      </div>
    );
  }
}
