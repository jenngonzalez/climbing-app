import React, { Component } from 'react';
import Moment from 'react-moment';
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
            lat: null,
            lng: null,
            error: null,
            weather: null,
            climbs: null,
            nearbyLocations: []
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
                        const { timezone } = weatherData
                        const { temperature, summary, humidity, time } = weatherData.currently
                        // format icon string so react-skycons understands
                        const weatherIcon = weatherData.currently.icon.toUpperCase().replace(/-/g, '_')
                        const currentWeather = { temperature, summary, humidity, time, timezone, weatherIcon }
                  
                        this.setState({
                            weather: currentWeather
                        })
                        console.log('currentWeather to context', currentWeather)
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
                    console.log('climbsObj', climbsObj)
                    this.setState({
                        climbs: climbsObj
                    })
                })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }





    renderLocations = () => {
       const locations =  Object.keys(this.state.climbs)
       console.log(locations)
       return (
           <p>
               {locations}
           </p>
       )
    }

    // renderClimbs = () => {
    //     const listClimbs = this.state.climbs.map(climb =>

    //         <ul key={climb.id}>
    //             <li>{climb.name}</li>
    //             <li>{climb.location[3]}</li>
    //             <li>{climb.rating}</li>
    //         </ul>
    //     )
    //     return (
    //         <>
    //             {listClimbs}
    //         </>
    //     )
    // }

    render() {
        // const unixTimestamp = this.state.weather.time
        // const tz = this.state.weather.timezone
        // const icon = this.state.weather.weatherIcon
        console.log('this.state.weather', this.state.weather)
        console.log('this.state.climbs', this.state.climbs)
        console.log('this.context.weather', this.context.weather)

        return (
            <div className='climbing-plan'>
                <section className='weather'>
                    WEATHER
                    {/* <p>Current Time: <Moment unix tz={tz} format="MMM Do YYYY hh:mm a">{unixTimestamp}</Moment></p>
                    <p>Current Temp: {this.state.weather.temperature} &deg;</p>
                    <p>Current Humidity: {this.state.weather.humidity}</p>
                    <p>Summary: {this.state.weather.summary}</p>
                    <div className='skycon'>
                        <Skycons 
                            color='white' 
                            icon={icon}
                            autoplay={true}
                            id='weather-icon'
                            height= {64}
                        />
                    </div> */}
                </section>
                <section className='map'>MAP</section>
                <section className='list'>
                    LIST OF ROUTES
                    {/* {this.renderClimbs()} */}
                </section>
            </div>
        )
    }
}