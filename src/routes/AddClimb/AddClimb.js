import React, { Component } from 'react';
import AddClimbForm from '../../components/AddClimbForm/AddClimbForm';
import placeholder from './climber.png';

export default class AddClimb extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: this.props.location.state ? this.props.location.state.location : '',
            name: this.props.location.state ? this.props.location.state.name : '',
            type: this.props.location.state ? this.props.location.state.type : '',
            grade: this.props.location.state ? this.props.location.state.grade : 'V0',
            image: this.props.location.state ? this.props.location.state.image : placeholder
        }
    }

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleAddClimbSuccess = () => {
        const { history } = this.props
        history.push('/track')
    }

    handleCancel = () => {
        this.props.history.goBack()
    }

    render() {
        const climbDetails = {
            location: this.state.location,
            name: this.state.name,
            type: this.state.type,
            grade: this.state.grade,
            image: this.state.image
        }
        return (
            <AddClimbForm
                climbDetails={climbDetails}
                onAddSuccess={this.handleAddClimbSuccess}
                onCancel={this.handleCancel}
            />
        )
    }
}