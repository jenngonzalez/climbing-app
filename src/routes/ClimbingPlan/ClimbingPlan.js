import React, { Component } from 'react';
import Moment from 'react-moment';
import Skycons from 'react-skycons'
import GetWeatherApiService from '../../services/getWeather-api-service';
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
            weatherIcon: null
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
                        console.log(weatherData)
                        const currentTemp = weatherData.currently.temperature
                        const currentSummary = weatherData.currently.summary
                        const currentHumidity = weatherData.currently.humidity
                        const currentTime = weatherData.currently.time
                        const timeZone = weatherData.currently.timezone
                        const weatherIcon = weatherData.currently.icon.toUpperCase()
                        this.setState({
                            currentTemp: currentTemp,
                            currentHumidity: currentHumidity,
                            currentSummary: currentSummary,
                            currentTime: currentTime,
                            timeZone: timeZone,
                            weatherIcon: weatherIcon
                        })
                    })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }


    render() {
        const unixTimestamp = this.state.currentTime
        const tz = this.state.timeZone
        const icon = this.state.weatherIcon

        return (
            <div className='climbing-plan' ref={el => (this.div = el)}>
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
                        />
                    </div>
                </section>
                <section className='map'>MAP</section>
                <section className='list'>LIST OF ROUTES</section>
            </div>
        )
    }
}