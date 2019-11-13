import React, { Component } from 'react';
import AddClimbForm from '../../components/AddClimbForm/AddClimbForm';

export default class AddClimb extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: this.props.location.state.location || '',
            name: this.props.location.state.name || '',
            type: this.props.location.state.type || '',
            grade: this.props.location.state.grade || '',
            image: this.props.location.state.image || ''
        }
    }

    static defaultProps = {
        location: {}
    }

    render() {
        const climbDetails = {
            location: this.state.location,
            name: this.state.name,
            type: this.state.type,
            grade: this.state.grade,
            image: this.state.image
        }
        console.log('props from link', this.props.location.state)
        return (
            <AddClimbForm climbDetails={climbDetails} />
        )
    }
}