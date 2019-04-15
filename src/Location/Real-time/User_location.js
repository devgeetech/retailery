import React, { Component } from "react";
import { error } from "util";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        this.setState({ error: error.message });
      },
      { enableHighAccuracy: true, timeout: 1, maximumAge: 1, distanceFilter: 1 }
    );
  }
  render() {
    return (
      <div className="Location">
        <header className="Location">
          {this.state.latitude && this.state.longitude ? (
            <text>
              Mylocation is:{this.state.latitude},{this.state.longitude}
            </text>
          ) : (
            <text>i dont know where u are</text>
          )}
        </header>
      </div>
    );
  }
}

export default Location;
