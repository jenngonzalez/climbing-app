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

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);

    const infowindow = new google.maps.InfoWindow();

    const request = {
        query: this.props.selectedPlace,
        fields: ['name', 'geometry'],
      };
    
    
    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
        }
    })

    function createMarker(place) {

        const placeLoc = place.geometry.location;
        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name, place.website);
          infowindow.open(map, this);
        });
      } 
  }
   

  render() {

    // if (!this.props.google) {
    //     return <div>Loading...</div>;
    //   }
    const style = {
        width: '300px',
        height: '150px'
    }
    // const lat = this.props.lat
    // const lng = this.props.lng
    console.log('maps prop lat', this.props.lat)
    return (
        <Map
            // google={this.props.selectedPlace}
            google={this.props.google}
            onReady={this.fetchPlaces}
            visible={false}
            style={style}
            initialCenter={{
                lat: this.props.lat,
                lng: this.props.lng
            }}
            zoom={14}
            onClick={this.onMapClicked}
        >


        <Listing places={this.state.place} />

 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow>
            <div>
              <h1>{this.props.selectedPlace}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (config.MAPS_KEY)
})(MapContainer)