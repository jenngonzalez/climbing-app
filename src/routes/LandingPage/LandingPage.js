import React, { Component } from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <div className='info-section'>
                    Take Your Climbs Outside
                </div>
                <div className='landing-info-container'>
                    <div className='landing-info'>
                        <h3>Plan Your Next Climbing Trip</h3>
                        <p>See nearby climbing areas and routes, or search for a specific location. Filter by type and grade of climbs. Check current and future weather. </p>
                    </div>
                    <div className='landing-info'>
                        <h3>Share With Friends</h3>
                        <p>After planning out your trip, save it and get a shareable link to invite friends along.</p>
                    </div>
                    <div className='landing-info'>
                        <h3>Track Your Progress</h3>
                        <p>Keep track of your achievements - save your completed climbs and see statistics for the day, week, month or year.</p>
                    </div>
                </div>
            </div>
        )
    }
}