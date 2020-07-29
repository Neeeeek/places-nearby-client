import React, { Component } from "react";

import AdminService from "../services/admin.service";
import AdminCategoriesForm from "./admin-categories-form.component";
export default class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      categories: this.props.categories,
      showAddCategory: false,
      inputAddCategory: "",
    };
  }

  componentDidMount() {}

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmitCategory = (e) => {
    e.preventDefault();

    let check = false;

    this.state.categories.map((i) => {
      // console.log(i.name + " " + body.name);
      if (i.name === this.state.inputAddCategory) check = true;
    });
    if (!check) {
      const category = { name: this.state.inputAddCategory };

      //console.log(category);
      AdminService.addCategory(category).then(
        (response) => {},
        (error) => {
          console.log(error.response);
        }
      );
      const push = {
        id: this.state.categories.length + 1,
        name: this.state.inputAddCategory,
        visibility: false,
      };

      this.setState((prevState) => ({
        categories: [...prevState.categories, push],
        inputAddCategory: "",
      }));
    }
  };

  handleChangeVisibility = (id) => {
    AdminService.changeVisibility(id).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error.response);
      }
    );

    const categories = this.state;

    console.log("tt");
    categories.categories[id - 1].visibility = !categories.categories[id - 1]
      .visibility;

    console.log(categories);
    this.setState((prevState) => ({
      categories: categories.categories,
    }));
  };

  handleButtonAddCategory = () => {
    this.setState((prevState) => ({
      showAddCategory: !prevState.showAddCategory,
    }));
  };
  render() {
    const categories = this.state.categories.map((i) => {
      return (
        <tr key={i.id}>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>
            <div class="btn-group mr-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onClick={() => this.handleChangeVisibility(i.id)}
              >
                {i.visibility ? "Hide" : "Publish"}
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary disabled"
              >
                Delete
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary disabled"
              >
                Modify
              </button>
            </div>
          </td>
        </tr>
      );
    });

    const { showAddCategory } = this.state;
    return (
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button
                type="button"
                onClick={this.handleButtonAddCategory}
                class="btn btn-sm btn-outline-secondary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        {showAddCategory ? (
          <AdminCategoriesForm
            name={this.state.quizName}
            handleChange={this.handleChange}
            handleSubmitCategory={this.handleSubmitCategory}
            inputAddCategory={this.state.inputAddCategory}
          />
        ) : null}{" "}
        <h2>Categories</h2>{" "}
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>{categories}</tbody>
          </table>
        </div>
      </main>
    );
  }
}
