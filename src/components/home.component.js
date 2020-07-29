import React, { Component } from "react";
import MapContainer from "./map.component";
import UserService from "../services/user.service";
import PlaceService from "../services/place.service";
import AuthService from "../services/auth.service";

const colors = [
  {
    color: "69f2fe",
  },
  {
    color: "69fe75",
  },
  {
    color: "fe7569",
  },
  {
    color: "fec069",
  },
  {
    color: "f2fe69",
  },
  {
    color: "b9c2d9",
  },
  {
    color: "c90579",
  },
  {
    color: "9400d3",
  },
  {
    color: "f3f6ef",
  },
  {
    color: "f8b6a8",
  },
];
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      categories: [],
      pointingMarker: {},
      placesList: [],
      favPlaceList: [],
      showFavPlaceList: false,
      counterFavPlace: 0,
      type: "",
    };
  }

  componentDidMount() {
    this.getCategories();
    if (AuthService.getCurrentUser() !== null) {
      this.getFavouritePlaces();
    }
  }

  getCategories() {
    PlaceService.getCategories().then(
      (response) => {
        this.setState({
          categories: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  getFavouritePlaces() {
    UserService.getFavouritePlaces().then(
      (response) => {
        this.setState({
          favPlaceList: response.data,
          showFavPlaceList: true,
          counterFavPlace: response.data.length,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handlePointingMarker = (pointingMarker) => {
    this.setState({
      pointingMarker,
    });
  };

  handleButtonClear = () => {
    this.setState({
      placesList: [],
      //  favPlaceList: [],
    });
  };

  handleButtonShowFavourites = () => {
    this.getFavouritePlaces();
    this.setState({
      placesList: this.state.favPlaceList,
    });
  };

  handleMarkerClickFavouritesPlaces = (body) => {
    let check = false;

    this.state.favPlaceList.map((i) => {
      // console.log(i.name + " " + body.name);
      if (i.name === body.name) check = true;
    });
    if (!check) {
      UserService.addFavouritesPlaces(body).then((response) => {
        console.log(response);
        const prevFavplacesList = this.state.favPlaceList;
        const nowa = prevFavplacesList.concat(body);
        this.setState({
          favPlaceList: nowa,
        });
      });
    }

    //this.getFavouritePlaces();
  };

  handleClickOnTheMap = () => {
    const type = this.state.type;
    const pointingMarker = this.state.pointingMarker;
    const lat = pointingMarker.lat;
    const lon = pointingMarker.lng;
    const body = { lat, lon, type };
    PlaceService.getPlaces(body).then(
      (response) => {
        const prevplacesList = this.state.placesList;
        const nowa = prevplacesList.concat(response);
        this.setState({
          placesList: nowa,
        });
      },
      (error) => {
        console.log(error.response);
      }
    );
  };
  handleButtonCategoryChoice = (type) => {
    console.log(type);

    this.setState({
      type,
    });
    // const pointingMarker = this.state.pointingMarker;
    // const lat = pointingMarker.lat;
    // const lon = pointingMarker.lng;
    // const body = { lat, lon, type };
    // PlaceService.getPlaces(body).then(
    //   (response) => {
    //     const prevplacesList = this.state.placesList;
    //     const nowa = prevplacesList.concat(response);
    //     this.setState({
    //       placesList: nowa,
    //     });
    //   },
    //   (error) => {
    //     console.log(error.response);
    //   }
    // );
  };

  render() {
    const {
      categories,
      placesList,
      favPlaceList,
      showFavPlaceList,
    } = this.state;
    let categoriesNav = null;

    // console.log(categories)
    if (categories !== null) {
      categoriesNav = categories.map((n) => {
        // console.log(colors[n.id].color);
        if (n.visibility) {
          return (
            <button
              type="button"
              style={{ color: `#${colors[n.id - 1].color}` }}
              class="btn btn-sm btn-outline-secondary"
              onClick={() => this.handleButtonCategoryChoice(n.name)}
            >
              {n.name} {n.visibility}
            </button>
          );
        }
      });
    }
    return (
      <>
        <div className="navp">
          <p className="notification ">
            Pick a type and click on the map!{" "}
            {showFavPlaceList
              ? "Click on the marker to add to favourites!"
              : null}
          </p>
        </div>

        <div className="info ">
          <div className="btn-group "> {categoriesNav}</div>
          <div className="btn-group ml-3 ">
            {" "}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={this.handleButtonClear}
            >
              Clear
            </button>
            {showFavPlaceList ? (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={this.handleButtonShowFavourites}
              >
                Show my favourites ({favPlaceList.length})
              </button>
            ) : null}
          </div>
          <div className="d-inline align-content-center justify-content-center "></div>
        </div>
        <div className="map">
          <MapContainer
            handlePointingMarker={this.handlePointingMarker}
            placesList={placesList}
            colors={colors}
            handleClickOnTheMap={this.handleClickOnTheMap}
            handleMarkerClickFavouritesPlaces={
              this.handleMarkerClickFavouritesPlaces
            }
          />
        </div>
      </>
    );
  }
}
