import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import Skycons from 'react-skycons';
import ClimbingContext from '../../contexts/ClimbingContext';
import GetWeatherApiService from '../../services/getWeather-api-service';
import GetClimbsApiService from '../../services/getClimbs-api-service';
import './ClimbingPlan.css';



export default class ClimbingPlan extends Component {

    static contextType = ClimbingContext

    constructor(props) {
        super(props)
        this.state = {
            seeDetails: false,
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
                GetWeatherApiService.getWeather(lat, lng)
                    .then(weatherData=> {
                        const { timezone } = weatherData
                        const { temperature, summary, humidity, time } = weatherData.currently
                        // format icon string so react-skycons understands
                        const weatherIcon = weatherData.currently.icon.toUpperCase().replace(/-/g, '_')
                        const currentWeather = { temperature, summary, humidity, time, timezone, weatherIcon }

                        this.context.addWeather(currentWeather)
                    })
                GetClimbsApiService.getClimbs(lat, lng)
                .then(climbData => {
                    // create an array of the unique locations so we can sort them for the user
                    console.log('climbData', climbData)
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
                            image: climb.image
                        })
                        return climbsObj
                    })
                    this.context.addClimbs(climbsObj)
                })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }


    seeDetails = (climbArea) => {
        console.log('climbArea in seeDetails', climbArea)
        this.setState({
            seeDetails: !this.state.seeDetails,
            location: climbArea
        })
        // only where location matches
    }

    // hideDetails = () => {
    //     this.setState({
    //         seeDetails: false,
    //         location: null
    //     })
    //     console.log('this.state.location', this.state.location)
    // }


    renderLocations = () => {
        const visible = this.state.seeDetails
        const location = this.state.location
        const climbs = this.context.climbs
        
        const sortedClimbs = Object.keys(climbs).map(key => ({location: key, climbs: climbs[key]}));

        const displayClimbs = sortedClimbs.map((climb, i) => {
            const climbArea = climb.location
            const climbData = climb.climbs.map(c => {
                return (
                    <ul key={c.id} className='climb-list'>
                        <li key={c.name}>Name: {c.name}</li>
                        <li key={c.type}>Type: {c.type}</li>
                        <li key={c.grade}> Grade: {c.rating}</li>
                    </ul>
                )
 
            })
            return (
                <div key={i}>
                    <button
                        className='climb-location'
                        onClick={() => this.seeDetails(climbArea)}
                    >
                        {climbArea}
                    </button>
                    <span>
                        {/* working but can only have one menu open at a time */}
                        {(visible && location === climbArea) && <div>{climbData}</div>}
                    </span>
                </div>
            )
        })
        return (
            <section>
                {displayClimbs}
            </section>
        )
    }

    render() {
        const unixTimestamp = this.context.weather.time
        const tz = this.context.weather.timezone
        const icon = this.context.weather.weatherIcon
        // console.log('this.state', this.state)

        return (
            <div className='climbing-plan'>
                <section className='weather'>
                    WEATHER
                    <p>Current Time: <Moment unix tz={tz} format="MMM Do YYYY hh:mm a">{unixTimestamp}</Moment></p>
                    <p>Current Temp: {this.context.weather.temperature} &deg;</p>
                    <p>Current Humidity: {this.context.weather.humidity}</p>
                    <p>Summary: {this.context.weather.summary}</p>
                    <div className='skycon'>
                        <Skycons 
                            color='white' 
                            icon={icon}
                            autoplay={true}
                            id='weather-icon'
                            height= {64}
                        />
                    </div>
                </section>
                <section className='map'>MAP</section>
                <section className='list'>
                    LIST OF ROUTES
                    {this.renderLocations()}
                </section>
            </div>
        )
    }
}
