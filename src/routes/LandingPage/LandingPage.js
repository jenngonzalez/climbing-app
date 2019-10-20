import React, { Component } from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <section>
                    <h3>Plan Your Next Climbing Trip</h3>
                    <p>See nearby climbing areas and routes, or search for a specific location. Filter by type and grade of climbs. Check current and future weather. </p>
                </section>
                <section>
                    <h3>Share With Friends</h3>
                    <p>After planning out your trip, save it and get a shareable link to invite friends along.</p>
                </section>
                <section>
                    <h3>Track Your Progress</h3>
                    <p>Keep track of your achievements - save your completed climbs and see statistics for the day, week, month or year.</p>
                </section>
            </div>
        )
    }
}