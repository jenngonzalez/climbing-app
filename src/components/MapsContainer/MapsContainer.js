import React, { Component } from 'react';
import {Map, InfoWindow, Marker, Listing, GoogleApiWrapper} from 'google-maps-react';
import config from '../../config';
 
export class MapContainer extends Component {

  state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        place: {}
      };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

//   createMarker = (map, maps) => {
//     let marker = new maps.Marker({
//       position: myLatLng,
//       map,
//       title: 'Hello World!'
//     });
//   }

   renderMarkers = () => {
        const locationName = this.props.selectedPlace

        this.props.climbLocs.map(loc => {
            const latLng =  {
                lat: loc.climbLat,
                lng: loc.climbLng
            }

            return (
                <Marker
                    position={latLng}
                    name={locationName}
                />
            )
        })
   }

   render() {

    if (!this.props.google) {
        return <div>Loading...</div>;
      }
    const style = {
        width: '50vw',
        height: '25vh'
    }

    console.log('maps props', this.props)
 
    // this.renderMarkers()

    return (
        <Map
            google={this.props.google}
            style={style}
            initialCenter={{
                lat: this.props.lat,
                lng: this.props.lng
            }}
            zoom={8}
            onClick={this.onMapClicked}
        >

        {this.renderMarkers()}
 
        <Marker position={{lat: 47.574, lng: -122.295}} name="test"/>
        {/* <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
                // geocode each location then map through creating Markers for each */}
 
        <InfoWindow>
            <div>
              <h1>{this.props.selectedPlace}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 

// API key is set to restricted, GitHub still notifies vulnerability
export default GoogleApiWrapper({
  apiKey: (config.MAPS_KEY)
})(MapContainer)

MapContainer.defaultProps = {
    selectedPlace: '',
    climbLocs: [{}, {}, {}],
    lat: null,
    lng: null
} 
