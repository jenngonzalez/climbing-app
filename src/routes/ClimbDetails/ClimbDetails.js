import React, { Component } from 'react';
import './ClimbDetails.css';


export default class ClimbDetails extends Component {

    renderDetails = () => {
        const { climbLatLng } = this.props.location.state

        return climbLatLng.map((climb, i) => {
            return (
                <div key={i} className='location-details'>
                    <div className='details-image'>
                        <img src={climb.climbImage} alt={climb.climbName}/>
                    </div>
                    <div className='details-text'>
                        <p><span className='climb-name'>{climb.climbName}</span></p>
                        <p>{climb.climbType}</p>
                        <p>{climb.climbGrade}</p>

                        <a href={climb.climbUrl}>More Info</a>
                    </div>
                </div>
            )
        })
    }
     

    render() {
        return (
            <div className='details-container'>
                {!this.props.location.state
                    ? <p>Click on a climbing area from the "plan" page to see details here!</p>
                    : (
                        <div className='selected-location-details'>
                            <h2>{this.props.location.state.climbArea}</h2>
                            {this.renderDetails()}
                        </div>
                    )
                }
            </div>
         
        )
    }
}