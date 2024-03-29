import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AddClimbApiService from '../../services/add-climb-api-service';
import ClimbingContext from '../../contexts/ClimbingContext';
import TokenService from '../../services/token-service';
import placeholder from './girl-climber.jpg';
import './AddClimbForm.css';



export default class AddClimbForm extends Component {

    static contextType = ClimbingContext

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            climbDate: new Date(),
            climbLocation: this.props.climbDetails.location,
            climbName: this.props.climbDetails.name,
            climbType: this.props.climbDetails.type,
            climbGrade: this.props.climbDetails.grade,
            climbStatus: null,
            climbImage: this.props.climbDetails.image
        }
    }

    static defaultProps = {
        climbDetails: {},
        location: {},
        history: {
            push: () => {}
        },
        onAddSuccess: () => {},
        onCancel: () => {}
    }


    handleChangeDate = (date) => {
        this.setState({
            climbDate: date
        });
    }

    handleChangeLocation = (e) => {
        this.setState({
            climbLocation: e.target.value
        })
    }

    handleChangeName = (e) => {
        this.setState({
            climbName: e.target.value
        })
    }

    handleChangeType = (e) => {
        this.setState({
            climbType: e.target.value
        });
    }

    handleChangeGrade = (e) => {
        this.setState({
            climbGrade: e.target.value
        })
    }

    handleChangeStatus = (e) => {
        this.setState({
            climbStatus: e.target.value
        })
    }

    handleChangeImage = (e) => {
        this.setState({
            climbImage: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ loading: true })

        const { climbLocation, climbName, climbType, climbGrade, climbStatus, climbImage } = e.target
     
        // const climbDateToString = this.state.climbDate.toString()
        // formatting to include time not working, .toString() throws an error

        const climbDateToDateString = this.state.climbDate.toDateString()
        const hasToken = TokenService.hasAuthToken()
        if(!hasToken) {
            alert('You must be logged in to save a climb')
        } else {
            if(!this.state.climbStatus) {
                this.setState({
                    error: 'Missing Field: "Status"',
                    loading: false
                })
                return false
            }

            const newClimb = {
                date: this.state.climbDate,
                location: this.state.climbLocation,
                climb_name: this.state.climbName,
                climb_type: this.state.climbType,
                climb_grade: this.state.climbGrade,
                user_status: this.state.climbStatus,
                image: this.state.climbImage
            }
            AddClimbApiService.postClimb(newClimb)
                .then(this.context.addUserClimb)
                .then(this.props.onAddSuccess)
                .catch(res => {
                    this.setState({ loading: false, error: res.error })
                })
        }
    }


    render() {
        const { error } = this.state
        return (
            <form className='add-climb-form' onSubmit={this.handleSubmit}>
                {this.state.loading && <p className='loading'>Submitting Your Info ...</p>}
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                <label htmlFor='climbDate'>Date:</label>
                <DatePicker
                    selected={this.state.climbDate}
                    onChange={this.handleChangeDate}
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
                    required
                    value={this.state.climbLocation}
                    onChange={this.handleChangeLocation}
                />
                <label htmlFor='climbName'>Route/Problem Name:</label>
                <input
                    type='text'
                    name='climbName'
                    id='climbName'
                    aria-label='the name of the route or problem that you climbed'
                    aria-required='true'
                    required
                    value={this.state.climbName}
                    onChange={this.handleChangeName}
                />
                <label htmlFor='climbType'>
                    Type of Climb:
                    <br/>
                    <span className='small'>*support for other types coming soon!*</span>
                </label>
                <select
                    name='climbType'
                    className='select-menu'
                    id='climbType'
                    aria-label='type of climb'
                    aria-required='true'
                    required
                    value={this.state.climbType}
                    onChange={this.handleChangeType}
                >
                    <option value='Boulder'>Boulder</option>
                </select>
                <label htmlFor='climbGrade'>Route/Problem Grade:</label>
                <select
                    name='climbGrade'
                    className='select-menu'
                    id='climbGrade'
                    aria-label='the grade of the route or problem that you climbed'
                    aria-required='true'
                    required
                    value={this.state.climbGrade}
                    onChange={this.handleChangeGrade}
                >
                    <option value='V0'>V0</option>
                    <option value='V1'>V1</option>
                    <option value='V2'>V2</option>
                    <option value='V3'>V3</option>
                    <option value='V4'>V4</option>
                    <option value='V5'>V5</option>
                    <option value='V6'>V6</option>
                    <option value='V7'>V7</option>
                    <option value='V8'>V8</option>
                    <option value='V9'>V9</option>
                    <option value='V10'>V10</option>
                    <option value='V11'>V11</option>
                    <option value='V12'>V12</option>
                    <option value='V13'>V13</option>
                    <option value='V14'>V14</option>
                    <option value='V15'>V15</option>
                </select>
                <label htmlFor='climbStatus'>Your Status:</label>
                <select
                    name='climbStatus'
                    className='select-menu'
                    id='climbStatus'
                    aria-label='completion status of the route you climbed'
                    aria-required='true'
                    required
                    defaultValue='select-message'
                    onChange={this.handleChangeStatus}
                >
                    <option disabled value='select-message'>Select a status:</option>
                    <option value='Attempt'>Attempt</option>
                    <option value='Send'>Send</option>
                    <option value='Flash'>Flash</option>
                    <option value='On-Sight'>On-Sight</option>
                </select>
                <label htmlFor='climbImage'>Climb Image:</label>
                <input
                    type='url'
                    name='climbImage'
                    id='climbImage'
                    aria-label='an optional image of your climb'
                    aria-required='false'
                    value={this.state.climbImage}
                    onChange={this.handleChangeImage}
                />
                <div className='add-climb-form-button'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        )
    }
}