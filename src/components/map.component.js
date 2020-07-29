import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import AuthService from "../services/auth.service";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
    pointingMarker: {},
    favouritesPlaces: {},
    placesList: this.props.placesList,
  };

  // onMarkerClick = (props, marker, e) => {};
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  handleMarkerClickFavouritesPlaces = (props, marker, e) => {
    const favPlace = {
      name: props.label,
      formattedAddress: props.formattedAddress,
      rating: props.rating,
      category: props.category,
      lat: props.position.lat,
      lon: props.position.lng,
    };
    if (AuthService.getCurrentUser() !== null) {
      this.props.handleMarkerClickFavouritesPlaces(favPlace);
    }
  };

  onMapClicked = (props, map, coord) => {
    //console.log("test");

    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const pointingMarker = { lat, lng };
    this.setState({
      pointingMarker,
    });

    this.props.handlePointingMarker(pointingMarker);
    this.props.handleClickOnTheMap();
  };

  render() {
    const { placesList, colors } = this.props;

    const placesMarker = placesList.map((p) => {
      const color = colors[p.category.id - 1].color;

      return (
        <Marker
          key={p.formattedAddress}
          position={{ lat: p.lat, lng: p.lon }}
          label={p.name}
          category={p.category}
          formattedAddress={p.formattedAddress}
          rating={p.rating}
          onClick={this.handleMarkerClickFavouritesPlaces}
          icon={{
            url:
              "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
              color,

            scaledSize: new window.google.maps.Size(14, 20),
            labelOrigin: new window.google.maps.Point(10, -10),
          }}
        />
      );
    });
    const pointingMarker = (
      <Marker
        position={this.state.pointingMarker}
        name={"Current location"}
        icon={{
          url: "icons/location-pin.png",

          scaledSize: new window.google.maps.Size(24, 24),
          labelOrigin: new window.google.maps.Point(10, -10),
        }}
        onClick={this.onMarkerClick}
      />
    );
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        containerStyle={containerStyle}
        initialCenter={{ lat: 51.1517799, lng: 17.0262679 }}
        mapTypeId="roadmap"
        zoom={12}
      >
        {pointingMarker}
        {placesMarker}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC827lbbozCI4A2vgE0EZvalCF6BWz3GKY",
})(MapContainer);
