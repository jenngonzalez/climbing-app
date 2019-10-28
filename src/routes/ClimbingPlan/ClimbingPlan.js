import React, { Component } from 'react';
import GetWeatherApiService from '../../services/getWeather-api-service';
import './ClimbingPlan.css';

export default class ClimbingPlan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            error: null,
            currentTemp: null
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
                console.log('lat', lat, 'lng', lng)
                GetWeatherApiService.getWeather(lat, lng)
                    .then(weatherData=> {
                        console.log(weatherData)
                        const currentTemp = weatherData.currently.temperature
                        this.setState({ currentTemp: currentTemp })
                    })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }


    render() {
        return (
            <div className='climbing-plan' ref={el => (this.div = el)}>
                <section className='weather'>
                    WEATHER
                    <p>Latitude: {this.state.lat}</p>
                    <p>Longitude: {this.state.lng}</p>
                    <p>Current Temp: {this.state.currentTemp}</p>
                </section>
                <section className='map'>MAP</section>
                <section className='list'>LIST OF ROUTES</section>
            </div>
        )
    }
}