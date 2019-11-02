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
            climbs: [],
            nearbyLocations: []
        }
    }
// TODO  - save to context instead of state, esp. for climbs

// TODO - sort climbs by location
// map over returned climbs
// get location[3] for each
// return an array of location names (dont include duplicates, "!if[].includes() then push to array")
// then we have an array of the nearby locations

// sort climbs - take climb response and sort by location name
// for each climb - take location[3] name
// should we loop through twice? 
// first loop - take all location names and make objects with location names as keys:
// [{Gold Bar:}, {Index: }, {Leavenworth: }]
// ex: {Gold Bar: {
    //          name: Problem Name,
            //     type: Boulder,
            //     rating: V6
            //     },
        //     {
        //         name: Problem Name,
        //         type: Boulder,
        //         rating: V5
        //     }
        // }


        // const newArray = []
        // res.map(climb => {
        //     climb.location ->> push to array
        // })


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
                        // { temperature, summary, humidity, time, timezone } = weatherData.currently
                        const currentTemp = weatherData.currently.temperature
                        const currentSummary = weatherData.currently.summary
                        const currentHumidity = weatherData.currently.humidity
                        const currentTime = weatherData.currently.time
                        const timeZone = weatherData.currently.timezone
                        // format icon string so react-skycons understands
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
                    // create an array of the unique locations so we can sort them for the user
                    const climbLocations = []
                    climbData.routes.forEach(climb => {
                        if(!climbLocations.includes(climb.location[3])) {
                            climbLocations.push(climb.location[3])
                        }
                    })
                    return {climbLocations: climbLocations, climbData: climbData}
                })
                .then (data => {
                    const locations = data.climbLocations
                    const climbData = data.climbData
                    // now we turn the locations in the array into keys of an object, with their value each being an empty array (to which we will add any matching climbs)
                    const climbsObj = locations.reduce((a, key) => Object.assign(a, { [key]: [] }), {});
                    console.log('climbsObj', climbsObj)
                    // then we (.find or .filter?) through the climb data, and add (.push) each climb to it's corresponding location's array

                    // if location[3] matches climbsObj location -> add that climb to that location array

                })

                    // goal is to filter climbs and add them to the array of the object key that matches their location[3] (.push)


                    // map through climbData
                    // then use .find or .filter? look at locations for each climb and add it to the array as an object
    

                    // .then(climbData => {
                    //     console.log(climbData)
                    //     const allClimbs = climbData.routes.map(climb => {
                    //         return {
                    //             id: climb.id,
                    //             name: climb.name,
                    //             type: climb.type,
                    //             rating: climb.rating,
                    //             location: climb.location,
                    //             image: climb.imgSmall
                    //         }
                    //     })
                    //     this.setState({
                    //         climbs: allClimbs,
                    //     })
                    // })
            })
            .catch((err) => {
              console.error(err.message);
            });
    }

    sortClimbs = () => {
        let locations = []
        this.state.climbs.forEach(climb => {
            if(!locations.includes(climb.location[3])) {
            locations.push(climb.location[3])
            }
        })
        return locations
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
        console.log('this.state.nearbyLocations', this.state.nearbyLocations)
        this.sortClimbs()

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