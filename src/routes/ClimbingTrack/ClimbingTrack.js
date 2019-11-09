import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddClimbsForm from '../../components/AddClimbs/AddClimbs';
import './ClimbingTrack.css';

export default class ClimbingTrack extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false
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
        // TODO:
        // communicate success to user
        // update the "climbs" section to show the new climb (sort by date?)
    }

    render() {
        return (
            <div className='climbing-track'>
                <div className='add-form-container'>
                    <button onClick={this.showAddForm}>
                        Click to Add a Climb!
                    </button>
                    {this.state.showAddForm && <AddClimbsForm onAddSuccess={this.handleSubmitSuccess} onCancel={this.handleCancel}  />}
                </div>
                <div className='climbs'>
                    SHOW (get) CLIMBS
                </div>
            </div>
        )
    }
}