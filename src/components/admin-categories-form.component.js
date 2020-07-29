import React from "react";

const AdminCategoriesForm = (props) => {
  return (
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <label for="inputPassword2" class="sr-only">
          Category
        </label>
        <input
          type="text"
          class="form-control"
          id="inputAddCategory"
          name="inputAddCategory"
          placeholder="Category"
          value={props.inputAddCategory}
          onChange={props.handleChange}
        />
      </div>
      <button
        onClick={props.handleSubmitCategory}
        type="submit"
        class="btn btn-secondary btn-sm mb-2"
      >
        Submit
      </button>
    </form>
  );
};
export default AdminCategoriesForm;
