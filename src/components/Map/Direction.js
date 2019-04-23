/*global google*/
import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { CurrentLocation } from "./Map";

class MyMapComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    latitude: 0,
    longitude: 0
  }

  render() {

    const query = new URLSearchParams(this.props.location.search)
    let queryLis = []
    for(let param of query.entries()){
        queryLis.push(param)  
    }
    console.log(queryLis)
    const DirectionsComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: (
          <div
            style={{ height: `660px`, width: `1365px`, position: "absolute" }}
          />
        )
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          navigator.geolocation.getCurrentPosition(position => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          })
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new google.maps.LatLng(this.state.latitude, this.state.longitude),
              destination: new google.maps.LatLng(75.123, -87.546),
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: { ...result },
                  markers: true
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      })
    )(props => (
      <GoogleMap defaultZoom={3} streetViewControl={false}>
        {props.directions && (
          <DirectionsRenderer
            directions={props.directions}
            suppressMarkers={props.markers}
          />
        )}
      </GoogleMap>
    ));

    return <DirectionsComponent />;
  }
}

export default MyMapComponent;
