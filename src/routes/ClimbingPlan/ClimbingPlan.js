import React, { Component } from 'react';
import './ClimbingPlan.css';

export default class ClimbingPlan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            error: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
        }, err => console.log(err)
        );
    }


    render() {
        return (
            <div className='climbing-plan' ref={el => (this.div = el)}>
                <section className='weather'>
                    WEATHER
                    <p>Latitude: {this.state.lat}</p>
                    <p>Longitude: {this.state.lng}</p>
                </section>
                <section className='map'>MAP</section>
                <section className='list'>LIST OF ROUTES</section>
            </div>
        )
    }
}