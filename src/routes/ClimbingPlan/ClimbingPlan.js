import React, { Component } from 'react';
import './ClimbingPlan.css';

export default class ClimbingPlan extends Component {
    render() {
        return (
            <div className='climbing-plan'>
                <section className='weather'>WEATHER</section>
                <section className='map'>MAP</section>
                <section className='list'>LIST OF ROUTES</section>
            </div>
        )
    }
}