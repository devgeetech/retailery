import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Directionbutton from "../../components/UI/Button/Button";
import Auxil from "../../hoc/Auxil/Auxil";
import Layout from "../../hoc/Layout/Layout";
import CurrentLocation from "./Map";
import classes from "./Geo.module.css";
//import MapViewDirections from "react-native-maps-directions";

export class MapContainer extends Component {
  state = {
    streetViewControl: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Auxil>
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"your location"} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </Auxil>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE"
})(MapContainer);
