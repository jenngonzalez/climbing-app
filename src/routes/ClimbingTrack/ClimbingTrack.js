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
                            name: climb.climb_name,
                            grade: climb.climb_grade,
                            status: climb.user_status,
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

    showAddForm = () => {
        this.setState({
            showAddForm: true
        })
    }

    handleCancel = () => {
        this.setState({
            showAddForm: false
        })
    }

    handleSubmitSuccess = () => {
        this.setState({
            showAddForm: false
        })
        alert('Climb successfully added')
        // TODO:
        // communicate success to user
        // climbs section uses context to show climbs - update context?
    }

    renderUserClimbs = () => {
        // should we put this in a componentDidUpdate in order to get the updated context?
        // why is context updating and component is updating but just showing date?
        console.log('context.userClimbs', this.context.userClimbs)
        return this.context.userClimbs.map(climb =>
            <div className='user-climbs' key={climb.id}>
                <h3><Moment utc local format="MM/DD/YY">{climb.date}</Moment></h3>
                <p>{climb.name} - {climb.grade}</p>
            </div>
        )
    }

    render() {
        return (
            <div className='climbing-track'>
                <div className='add-form-container'>
                    <button onClick={this.showAddForm}>
                        Click to Add a Climb!
                    </button>
                    {this.state.showAddForm && <AddClimbForm onAddSuccess={this.handleSubmitSuccess} onCancel={this.handleCancel}  />}
                </div>
                <div className='user-climbs-container'>
                    SHOW (get) CLIMBS
                    {this.renderUserClimbs()}
                </div>
            </div>
        )
    }
}