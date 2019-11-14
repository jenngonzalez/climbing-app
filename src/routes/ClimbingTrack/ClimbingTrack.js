import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import GetUserClimbs from '../../services/get-user-climbs-api-service';
import AddClimbForm from '../../components/AddClimbForm/AddClimbForm';
import ClimbingContext from '../../contexts/ClimbingContext';
import './ClimbingTrack.css';

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
        if(!this.context.userClimbs.length) {
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
        }
    }

    // showAddForm = () => {
    //     this.setState({
    //         showAddForm: true
    //     })
    // }

    // handleCancel = () => {
    //     this.setState({
    //         showAddForm: false
    //     })
    // }

    // handleSubmitSuccess = () => {
    //     this.setState({
    //         showAddForm: false
    //     })
    //     alert('Climb successfully added')

    //     // TODO:
    //     // GET RID OF ADD FORM IN THIS COMPONENT AND JUST USE ADD PAGE?
    // }

    renderUserClimbs = () => {
        
        this.context.userClimbs.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateB - dateA;
          });

        return this.context.userClimbs.map(climb =>
            <div className='user-climbs' key={climb.id}>
                <h3><Moment utc local format="MM/DD/YY">{climb.date}</Moment></h3>
                <p>{climb.climb_name} - {climb.climb_grade}</p>
            </div>
        )
    }

    render() {
        return (
            <div className='climbing-track'>
                {/* <div className='add-form-container'>
                    <button onClick={this.showAddForm}>
                        Click to Add a Climb!
                    </button>
                    {this.state.showAddForm && <AddClimbForm onAddSuccess={this.handleSubmitSuccess} onCancel={this.handleCancel}  />}
                </div> */}
                <div className='user-climbs-container'>
                    SHOW (get) CLIMBS
                    {this.renderUserClimbs()}
                </div>
            </div>
        )
    }
}