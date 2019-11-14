import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import Skycons from 'react-skycons';
import MapsContainer from '../../components/MapsContainer/MapsContainer';
import ClimbingContext from '../../contexts/ClimbingContext';
import GetWeatherApiService from '../../services/getWeather-api-service';
import GetClimbsApiService from '../../services/getClimbs-api-service';
import './ClimbingPlan.css';


export default class ClimbingPlan extends Component {

    static contextType = ClimbingContext

    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            seeDetails: false,
            climbLocs: [],
            location: null,
            error: null
        }
    }

    componentDidMount() {
        const getPosition = function (options) {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
          }
          
          getPosition()
            .then((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                this.setState({
                    lat: lat,
                    lng: lng
                })
                GetWeatherApiService.getWeather(lat, lng)
                    .then(weatherData=> {
                        const { timezone } = weatherData
                        const { temperature, summary, humidity, time } = weatherData.currently
                        // format icon string so react-skycons recognizes it
                        const weatherIcon = weatherData.currently.icon.toUpperCase().replace(/-/g, '_')
                        const currentWeather = { temperature, summary, humidity, time, timezone, weatherIcon }

                        this.context.addWeather(currentWeather)
                    })
                GetClimbsApiService.getClimbs(lat, lng)
                .then(climbData => {
                    // create an array of the unique locations so we can sort them for the user
                    const climbLocations = []
                    climbData.routes.forEach(climb => {
                        if(!climbLocations.includes(climb.location[3])) {
                            climbLocations.push(climb.location[3])
                        }
                    })
  
                    this.context.addLocations(climbLocations)

                    // turn array of locations into an object (keys will be the locations) which we will use to sort our climbs
                    const climbsObj = climbLocations.reduce((a, key) => Object.assign(a, { [key]: [] }), {});

                    // add climb data to each location array based on climb.location matching the climbObj key
                    climbData.routes.forEach(climb => {
                        // Object.keys(climbsObj).find(key => climbsObj[key] === climb.location[3]);
                        climbsObj[climb.location[3]].push({
                            id: climb.id,
                            name: climb.name,
                            type: climb.type,
                            rating: climb.rating,
                            location: climb.location,
                            image: climb.imgSmall,
                            url: climb.url,
                            climbLat: climb.latitude,
                            climbLng: climb.longitude
                        })
                        return climbsObj
                    })
                    this.context.addNearbyClimbs(climbsObj)
                })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }


    seeDetails = (climbArea, climbLatLng) => {
        this.setState({
            seeDetails: !this.state.seeDetails,
            location: climbArea,
            climbLocs: climbLatLng
        })
        // TODO : add specific climb info to state, where it can be sent to 'track' component to prepopulate 'add climb' form
        // only where location matches
    }

    // TO DO :
    // hideDetails = () => {
        // if already open and clicked --->
    //     this.setState({
    //         seeDetails: false,
    //         location: null
    //     })
    //     console.log('this.state.location', this.state.location)
    // }

    // addClimb = () => {

    // }
    


    renderLocations = () => {
        const visible = this.state.seeDetails
        const location = this.state.location
        const climbs = this.context.nearbyClimbs
        
        const sortedClimbs = Object.keys(climbs).map(key => ({location: key, climbs: climbs[key]}));

        const displayClimbs = sortedClimbs.map((climb, i) => {
            const climbArea = climb.location
    
            const climbLatLng = []
            climb.climbs.forEach(c => {
                climbLatLng.push({
                    climbName: c.name,
                    climbLat: c.climbLat,
                    climbLng: c.climbLng,
                    climbLoc: c.location[3],
                    climbArea: c.location[2],
                    climbGrade: c.rating,
                    climbType: c.type,
                    climbImage: c.image,
                    climbUrl: c.url
                })
            })

            const climbData = climb.climbs.map(c => {
                return (
                    // <ul key={c.id} className='climb-list'>
                    //     <li key={c.name}>{c.name}</li>
                    //     <button>+ Track This Climb</button>
                    //     {/* <li key={c.type}>Type: {c.type}</li>
                    //     <li key={c.grade}> Grade: {c.rating}</li> */}
                    // </ul>
                    <div key={c.id} className='climb-list'>
                        <p>{c.name}</p>
                    </div>
                )
 
            })
            return (
                <div key={i}>
                    <button
                        className='climb-location'
                        onClick={() => this.seeDetails(climbArea, climbLatLng)}
                    >
                        {climbArea}
                    </button>
                    <div className='location-details'>
                        {/* working but can only have one menu open at a time */}
                        {(visible && location === climbArea) && <div>{climbData}</div>}
                    </div>
                </div>
            )
        })
        return (
            <>
                {displayClimbs}
            </>
        )
    }



    render() {
        const unixTimestamp = this.context.weather.time
        const tz = this.context.weather.timezone
        const icon = this.context.weather.weatherIcon

        console.log('context selectedClimb', this.context.selectedClimb)

        return (
            <div className='climbing-plan'>
                <div className='weather'>
                    Current Weather
                    {/* <p>Current Time: <Moment unix tz={tz} format="MMM Do YYYY hh:mm a">{unixTimestamp}</Moment></p> */}
                    <div className='forecast'>
                        <p>{this.context.weather.temperature} &deg;F</p>
                        {/* <p>Current Humidity: {this.context.weather.humidity}</p> */}
                        {/* need to multiply by 100 and put a % after */}
                    </div>
                    <div className='skycon'>
                        <p>{this.context.weather.summary}</p>
                        <Skycons 
                            color='white' 
                            icon={icon}
                            autoplay={true}
                            id='weather-icon'
                            height= {64}
                        />
                    </div>
                </div>
                {this.context.selectedClimb &&
                    <div className='selected-climb'>
                        {this.context.selectedClimb.name} - 
                        <Link to={{
                            pathname: '/add',
                            state: {
                                location: this.context.selectedClimb.location,
                                name: this.context.selectedClimb.name,
                                type: this.context.selectedClimb.type,
                                grade: this.context.selectedClimb.grade,
                                image: this.context.selectedClimb.image
                            }
                        }}>
                            Track This Climb
                        </Link>
                    </div>
                }
                <div className='map-and-list'>
                    <div className='map'>
                    {!this.state.location
                        ? <p className='clickMessage'>click a location to see climbs on the map</p>
                        : <MapsContainer
                            selectedPlace={this.state.location}
                            climbLocs={this.state.climbLocs}
                            lat={this.state.lat}
                            lng={this.state.lng}
                        />
                    }
                    </div>
                    <div className='list'>
                        Nearby Climbing Areas
                        {this.renderLocations()}
                    </div>
                </div>
            </div>
        )
    }
}
