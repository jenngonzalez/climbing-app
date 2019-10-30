import React, { Component } from 'react';
import Moment from 'react-moment';
import Skycons from 'react-skycons'
import GetWeatherApiService from '../../services/getWeather-api-service';
import GetClimbsApiService from '../../services/getClimbs-api-service';
import './ClimbingPlan.css';



export default class ClimbingPlan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            error: null,
            currentTemp: null,
            currentHumidity: null,
            currentSummary: null,
            currentTime: null,
            timeZone: null,
            weatherIcon: null,
            climbs: []
        }
    }
// TODO  - save to context instead of state, esp. for climbs

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
                        console.log(weatherData)
                        const currentTemp = weatherData.currently.temperature
                        const currentSummary = weatherData.currently.summary
                        const currentHumidity = weatherData.currently.humidity
                        const currentTime = weatherData.currently.time
                        const timeZone = weatherData.currently.timezone
                        // format text so react-skycons understands
                        const weatherIcon = weatherData.currently.icon.toUpperCase().replace(/-/g, '_')
                        this.setState({
                            currentTemp: currentTemp,
                            currentHumidity: currentHumidity,
                            currentSummary: currentSummary,
                            currentTime: currentTime,
                            timeZone: timeZone,
                            weatherIcon: weatherIcon
                        })
                    })
                GetClimbsApiService.getClimbs(lat, lng)
                    .then(climbData => {
                        console.log(climbData)
                        const allClimbs = climbData.routes.map(climb => {
                            return {
                                id: climb.id,
                                name: climb.name,
                                type: climb.type,
                                rating: climb.rating,
                                location: climb.location,
                                image: climb.imgSmall
                            }
                        })
                        this.setState({
                            climbs: allClimbs
                        })
                    })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }

    renderClimbs = () => {
        const listClimbs = this.state.climbs.map(climb =>
            <ul key={climb.id}>
                <li>{climb.name}</li>
                <li>{climb.location[3]}</li>
                <li>{climb.rating}</li>
            </ul>
        )
        return (
            <>
                {listClimbs}
            </>
        )
    }

    render() {
        const unixTimestamp = this.state.currentTime
        const tz = this.state.timeZone
        const icon = this.state.weatherIcon
        console.log('this.state.climbs', this.state.climbs)

        return (
            <div className='climbing-plan'>
                <section className='weather'>
                    WEATHER
                    <p>Current Time: <Moment unix tz={tz} format="MMM Do YYYY hh:mm a">{unixTimestamp}</Moment></p>
                    <p>Current Temp: {this.state.currentTemp} &deg;</p>
                    <p>Current Humidity: {this.state.humidity}</p>
                    <p>Summary: {this.state.currentSummary}</p>
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
                    {this.renderClimbs()}
                </section>
            </div>
        )
    }
}