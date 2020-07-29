import React from "react";

const UserFavouritePlaces = (props) => {
  const favPlaces = props.favPlacesList.map((i) => {
    return (
      <tr key={i.id}>
        <td>{i.name}</td>
        <td>{i.category.name}</td>
        <td>{i.formattedAddress}</td>
        <td>{i.rating}</td>

        <td>
          <div class="btn-group mr-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              onClick={() => props.handleDelete(i)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-2">
      <h3>Your favourite Places</h3>{" "}
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Address</th>
              <th>Rating</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{favPlaces} </tbody>
        </table>
      </div>
    </main>
  );
};

export default UserFavouritePlaces;
