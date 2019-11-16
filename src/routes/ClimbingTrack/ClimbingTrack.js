import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import GetUserClimbs from '../../services/get-user-climbs-api-service';
// import AddClimbForm from '../../components/AddClimbForm/AddClimbForm';
import ClimbingContext from '../../contexts/ClimbingContext';
import DeleteClimbApiService from '../../services/delete-climb-api-service';
import './ClimbingTrack.css';

const moment = require('moment');
moment().format();

export default class ClimbingTrack extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            loading: false
        }
    }

    static contextType = ClimbingContext

    componentDidMount() {
        // if(!this.context.userClimbs.length) {
            // how else to conditionally make the server request?
            // length doesn't work, after adding a climb the context has a length

            this.setState({
                loading: true
            })
            GetUserClimbs.getClimbs()
                .then(climbData => {
                    const userClimbs = climbData.map(climb => {
                        return {
                            id: climb.id,
                            date: climb.date,
                            location: climb.location,
                            climb_name: climb.climb_name,
                            climb_type: climb.climb_type,
                            climb_grade: climb.climb_grade,
                            user_status: climb.user_status,
                            image: climb.image
                        }
                    })
                    this.context.addUserClimbs(userClimbs)
                    this.setState({ loading: false })
                }).catch(err => {
                    console.log(err)
                    throw err
                })
        // }
    }

    deleteClimb = (climbId) => {
        DeleteClimbApiService.deleteClimb(climbId)
            .then(() => {
                this.context.deleteClimb(climbId)
            })
    }


    renderUserClimbs = () => {
        
        this.context.userClimbs.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateB - dateA;
          });


        return this.context.userClimbs.map(climb =>
            <div className='user-climbs' key={climb.id}>
                <h3><Moment local format="MM/DD/YY">{climb.date}</Moment></h3>
                <p>Location: {climb.location}</p>
                <p>{climb.climb_name} - {climb.climb_grade}</p>
                <p>Your Status: {climb.user_status}</p>
                <img src={climb.image} alt={climb.name} />
                <button type='button' onClick={() => {this.deleteClimb(climb.id)}}>Delete Climb</button>
            </div>
        )
    }

    render() {
        console.log('context userClimbs', this.context.userClimbs)
        return (
            <div className='user-climbs-container'>
                <h2>Your Completed Climbs</h2>
                {this.renderUserClimbs()}
            </div>
        )
    }
}