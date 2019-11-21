import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import Skycons from 'react-skycons';
import MapsContainer from '../../components/MapsContainer/MapsContainer';
import ClimbingContext from '../../contexts/ClimbingContext';
import GetWeatherApiService from '../../services/getWeather-api-service';
import GetClimbsApiService from '../../services/getClimbs-api-service';
import placeholder from './climber.png';
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
            error: null,
            loading: false,
            dailyData: null
        }
        this.mounted = false
    }


    // componentDidMount(){
    //     this.mounted = true;
      
    //     this.props.fetchData().then((response) => {
    //       if(this.mounted) {
    //         this.setState({ data: response })
    //       }
    //     })
    //   }
      
    //   componentWillUnmount(){
    //     this.mounted = false;
    //   }




    componentDidMount() {
        this.mounted = true
        this.mounted && this.setState({ loading: true })
    
        const getPosition = function (options) {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
          }
          
          getPosition()
            .then((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                this.mounted && this.setState({lat: lat, lng: lng})
                
                GetWeatherApiService.getWeather(lat, lng)
                    .then(weatherData => {
                        const { timezone } = weatherData
                        const { time, temperature, summary, humidity } = weatherData.currently
                        const currentIcon = weatherData.currently.icon.toUpperCase().replace(/-/g, '_')
                        const currentData = { timezone, time, temperature, summary, humidity, currentIcon}
                        const dailyData = weatherData.daily.data.map(day => {
                            return {
                                timezone: timezone,
                                date: day.time,
                                dailySummary: day.summary,
                                dailyIcon: day.icon.toUpperCase().replace(/-/g, '_'),
                                dailyTempHigh: day.temperatureHigh,
                                dailyTempLow: day.temperatureLow,
                                dailyHumidity: day.humidity
                            }
                        })
                        this.context.addCurrentWeather(currentData)
                        this.context.addDailyWeather(dailyData)
                    })
                GetClimbsApiService.getClimbs(lat, lng)
                .then(climbData => {
                    if(!climbData.length) {
                        this.mounted && this.setState({ error: 'No climbing areas found nearby'})
                    }
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
                            image: climb.imgSmall || placeholder,
                            url: climb.url,
                            climbLat: climb.latitude,
                            climbLng: climb.longitude
                        })
                        return climbsObj
                    })
                    this.context.addNearbyClimbs(climbsObj)
                    this.mounted && this.setState({ loading: false, error: null })
                })
            })
            .catch(res => {
                this.mounted && this.setState({ loading: false, error: res.error })
            })
    }

    componentWillUnmount() {
        this.mounted = false
    }


    seeDetails = (climbArea, climbLatLng) => {
        this.setState({
            seeDetails: !this.state.seeDetails,
            location: climbArea,
            climbLocs: climbLatLng
        })
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

    renderWeather = () => {
        return this.context.dailyWeather.map((day, i) => 
            <div className='daily-weather' key={i}>
                <Moment unix tz={day.timezone} format='ddd' className='weekday'>{day.date}</Moment>
                {/* {day.dailySummary} */}
                <p className='temp-high'>{Math.round(day.dailyTempHigh)}&deg;</p>
                <p className='temp-low'>{Math.round(day.dailyTempLow)}&deg;</p>
                <div className='skycon'>
                    <Skycons 
                        color='white' 
                        icon={day.dailyIcon}
                        autoplay={true}
                        id='weather-icon'
                        height= {128}
                    />
                </div>
            </div>
        )
    }

    renderLocations = () => {
        const climbs = this.context.nearbyClimbs
        const sortedClimbs = Object.keys(climbs).map(key => ({location: key, climbs: climbs[key]}));
        const displayClimbs = sortedClimbs.map((climb, i) => {
            const climbArea = climb.location.toUpperCase()
    
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

            return (
                <div key={i} className='location-and-link'>
                    <p>{climbArea}</p>
                    <button
                        className='climb-location'
                        onClick={() => this.seeDetails(climbArea, climbLatLng)}
                    >
                        See On Map
                    </button>
                    <Link to={{
                        pathname: '/climbdetails',
                        state: {
                            climbArea: climbArea,
                            climbLatLng: climbLatLng
                        }
                    }}>
                        See Location Info
                    </Link>
                </div>
            )
        })
        return (
            <div className='area-list'>
                {displayClimbs}
            </div>
        )
    }



    render() {
        // const humidity = (this.context.weather.humidity)*100
        const { error } = this.state

        return (
            <div className='plan-page-container'>
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                {this.state.loading
                    ? <p className='loading'>Loading Info for Nearby Climbs ...</p>
                    : <div className='climbing-plan'>
                        <div className='weather-container'>
                            {this.renderWeather()}
                        </div>
                        {/* <div className='map-and-list'> */}
                        {/* TODO: need this container for flex to desktop to work?? */}
                        <div className='list'>
                            <h2>Nearby Climbing Areas</h2>
                            {this.state.error && <p>{this.state.error}</p>}
                            {this.renderLocations()}
                        </div>
                        {this.context.selectedClimb &&
                            <div className='selected-climb'>
                                <span className='selected-climb-name'>
                                    "{this.context.selectedClimb.name.toUpperCase()}"
                                </span>
                                <br />
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
                        <div className='map'>
                            {this.state.location &&
                                <MapsContainer
                                    selectedPlace={this.state.location}
                                    climbLocs={this.state.climbLocs}
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                />
                            }
                        </div>
                        {/* </div> */}
                    </div>
                }
            </div>
        )
    }
}
