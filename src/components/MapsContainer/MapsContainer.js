import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import config from '../../config';
import ClimbingContext from '../../contexts/ClimbingContext';
import './MapsContainer.css';

// TODO - add marker clusters to group climbs by location
// TODO - add PropTypes

export class MapContainer extends Component {

    static contextType = ClimbingContext

    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            place: {},
            currentMarkers: [],
            initialCenter: {
                lat: null,
                lng: null
            }
        }
    }


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

    componentWillUnmount() {
        this.context.selectClimb(null)
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
        this.context.selectClimb(props)
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        this.context.selectClimb(null)
    }


    renderMarkers = () => {
        return this.props.climbLocs.map((loc, i) => {
            const latLng = {
                lat: loc.climbLat,
                lng: loc.climbLng
            }

            return (
                <Marker
                    position={latLng}
                    name={loc.climbName}
                    location={loc.climbLoc}
                    area={loc.climbArea}
                    type={loc.climbType}
                    grade={loc.climbGrade}
                    image={loc.climbImage}
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
            width: '100%',
            height: '100%',
        }

        return (
            <Map
                google={this.props.google}
                style={style}
                center={{
                    lat: this.props.climbLocs[0].climbLat,
                    lng: this.props.climbLocs[0].climbLng
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
                            <h1>"{this.state.selectedPlace.name}"</h1>
                            <h2>{this.state.selectedPlace.location}, {this.state.selectedPlace.area}</h2>
                            <h3>{this.state.selectedPlace.type} - {this.state.selectedPlace.grade}</h3>
                            <img src={this.state.selectedPlace.image} alt={this.state.selectedPlace.name} />
                        </div>
                </InfoWindow>
            </Map>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: (config.MAPS_KEY)
})(MapContainer)

MapContainer.defaultProps = {
    selectedPlace: '',
    climbLocs: [{
        climbName: '',
        climbLat: null,
        climbLng: null,
        climbLoc: '',
        climbArea: '',
        climbGrade: '',
        climbType: '',
        climbImage: '',
        climbUrl: ''
    }],
    lat: null,
    lng: null,
} 
