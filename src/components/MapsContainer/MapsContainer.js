import React, { Component } from 'react';
import { Map, InfoWindow, Marker, Listing, GoogleApiWrapper } from 'google-maps-react';
import config from '../../config';
import { relative } from 'path';

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        place: {},
        currentMarkers: []
    };

    componentDidMount() {
       this.setState({
            currentMarkers: this.renderMarkers()
        })
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.climbLocs.length !== prevProps.climbLocs.length) {
            this.setState({
                currentMarkers: this.renderMarkers()
            })
        }
    }

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


    renderMarkers = () => {
        // should we center map over locationName general latLng?

        return this.props.climbLocs.map((loc, i) => {
            const latLng = {
                lat: loc.climbLat,
                lng: loc.climbLng
            }

            return (
                <Marker
                    position={latLng}
                    name={loc.climbName}
                    key={i}
                    onClick={this.onMarkerClick}
                />
            )
        })
    }

    render() {

        if (!this.props.google) {
            return <div>Loading...</div>;
        }
        const style = {
            width: '400px',
            height: '400px',
            position: 'relative'
        }

        console.log('maps props', this.props)

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

                {this.state.currentMarkers}

                <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                >
                        <div className='infoWindow'>
                            <h1>{this.state.selectedPlace.name}</h1>
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
