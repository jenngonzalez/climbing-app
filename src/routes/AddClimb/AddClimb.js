import React, { Component } from 'react';
import AddClimbForm from '../../components/AddClimbForm/AddClimbForm';

export default class AddClimb extends Component {

    constructor(props) {
        super(props)
        if(this.props.location.state) {
            this.state = {
                location: this.props.location.state.location,
                name: this.props.location.state.name,
                type: this.props.location.state.type,
                grade: this.props.location.state.grade,
                image: this.props.location.state.image,
            }
        } else {
            this.state = {
                location: '',
                name: '',
                type: '',
                grade: '',
                image: ''
            }
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