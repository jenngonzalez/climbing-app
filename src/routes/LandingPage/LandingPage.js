import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <div className='info-section'>
                    <h2>Take Your Climbs Outside</h2>
                    <span className='call-to-action'><Link to='/plan'>See Nearby Bouldering Spots! <span className='arrow'>&#8608;</span></Link></span>
                </div>
                <div className='landing-info-container'>
                    <div className='landing-info'>
                        <h3>Plan Your Next Climbing Trip</h3>
                        <ul>
                            <li>See nearby climbing areas and routes using your current location.</li>
                            <li>View upcoming weather for the area, and see local climbing problems on Google Maps with expandable details such as name, grade, and picture.</li>
                        </ul>
                        <p>IN DEVELOPMENT:</p>
                        <ul>
                            <li>Search for climbs at other locations</li>
                            <li>Support for other types of climbing</li>
                            <li>Filter search by type and grade of climb</li>
                        </ul>
                    </div>
                    <div className='landing-info'>
                        <h3>Track Your Progress</h3>
                        <ul>
                            <li>Keep track of your achievements - save your completed climbs and see your overall statistics for average and best grade climbed.</li>
                        </ul>
                        
                        <p>IN DEVELOPMENT:</p>
                        <ul>
                            <li>Filter your statistics by day/week/month/year</li>
                        </ul>
                    </div>
                    <div className='landing-info'>
                        <h3>Coming Soon! - Share With Friends</h3>
                        <ul>
                            <li>After planning out your trip, save it and get a shareable link to invite friends along.</li>
                        </ul>
                    </div>
                    <div className='landing-info try'>
                        <h3>Try It Out!</h3>
                        <p>Feel free to try out the tracking and statistics features &#9786;</p>
                        <span className='login-password'>
                            <p>Login: testuser@email.com</p>
                            <p>Password: Password1</p>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}