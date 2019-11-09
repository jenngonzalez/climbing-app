import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AddClimbApiService from '../../services/add-climb-api-service';
import ClimbingContext from '../../contexts/ClimbingContext';
import TokenService from '../../services/token-service';
import './AddClimbs.css';

export default class AddClimbsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            climbDate: new Date()
        }
    }

    static contextType = ClimbingContext

    handleDateChange = (date) => {
        this.setState({
            climbDate: date
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const { climbLocation, climbName, climbGrade, climbStatus, climbImage } = e.target
        const hasToken = TokenService.hasAuthToken()
        if(!hasToken) {
            alert('You must be logged in to save a climb')
        } else {
            const newClimb = {
            date: this.state.climbDate,
            location: climbLocation.value,
            climb_name: climbName.value,
            climb_grade: climbGrade.value,
            user_status: climbStatus.value,
            image: climbImage.value,
            }
            console.log('newClimb', newClimb)
            AddClimbApiService.postClimb(newClimb)
                .then(this.context.addClimb)
                .then(this.props.onAddSuccess)
                .then(this.setState({ loading: false }))
                .catch(this.context.setError)
        }
    }


    render() {
        const { error } = this.state
        return (
            <form className='add-climbs-form' onSubmit={this.handleSubmit}>
                {this.state.loading && <p className='loading'>Submitting Your Info ...</p>}
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                <label htmlFor='climbDate'>Date:</label>
                <DatePicker
                    selected={this.state.climbDate}
                    onChange={this.handleDateChange}
                    id='climbDate'
                    aria-label='date of your accomplished climb'
                    aria-required='true'
                    popperPlacement='bottom'
                    popperModifiers={{
                        flip: {
                            behavior: ['bottom'] // don't allow it to flip to be above
                        },
                        preventOverflow: {
                            enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                        },
                        hide: {
                            enabled: false // turn off since needs preventOverflow to be enabled
                        }
                    }}
                />
                <label htmlFor='climbLocation'>Climb Location:</label>
                <input
                    type='text'
                    name='climbLocation'
                    id='climbLocation'
                    aria-label='location of your accomplished climb'
                    aria-required='true'
                    autoComplete='location'
                    required
                />
                <label htmlFor='climbName'>Route/Problem Name:</label>
                <input
                    type='text'
                    name='climbName'
                    id='climbName'
                    aria-label='the name of the route or problem that you climbed'
                    aria-required='true'
                    autoComplete='route name'
                    required
                />
                <label htmlFor='climbGrade'>Route/Problem Grade:</label>
                <input
                    type='text'
                    name='climbGrade'
                    id='climbGrade'
                    aria-label='the grade of the route or problem that you climbed'
                    aria-required='true'
                    autoComplete='email'
                    required
                />
                <label htmlFor='climbStatus'>Your Status:</label>
                <select
                    name='climbStatus'
                    aria-label='completion status of the route you climbed'
                    aria-required='true'
                    required
                >
                    <option value='On-Sight'>On-Sight</option>
                    <option value='Flash'>Flash</option>
                    <option value='Send'>Send</option>
                    <option value='Attempt'>Attempt</option>
                </select>
                <label htmlFor='climbImage'>Climb Image:</label>
                <input
                    type='url'
                    name='climbImage'
                    id='climbImage'
                    aria-label='an optional image of your climb'
                    aria-required='false'
                    autoComplete='url'
                />
                <button type='submit'>Submit</button>
                <button type='button' onClick={this.props.onCancel}>Cancel</button>
            </form>
        )
    }
}