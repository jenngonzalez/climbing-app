import React, { Component } from 'react';
import './ClimbingTrack.css';

export default class ClimbingTrack extends Component {
    render() {
        return (
            <div className='climbing-track'>
                <section className='climbs'>
                    CLIMBS
                </section>
                <section className='add'>
                    +
                </section>
            </div>
        )
    }
}