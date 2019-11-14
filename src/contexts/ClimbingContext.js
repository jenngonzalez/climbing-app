import React from 'react';

const ClimbingContext = React.createContext({
    weather: null,
    locations: [],
    nearbyClimbs: [],
    userClimbs: [],
    addWeather: () => {},
    addLocations: () => {},
    addNearbyClimbs: () => {},
    addUserClimbs: () => {},
    addUserClimb: () => {},
    selectClimb: () => {},
    deleteClimb: () => {}
})

export default ClimbingContext


export class ClimbingProvider extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            weather: [],
            locations: [],
            nearbyClimbs: [],
            userClimbs: [],
            selectedClimb: null
        }
    }

    addWeather = weather => {
        this.setState({ weather })
    }

    addLocations = locations => {
        this.setState({ locations })
    }

    addNearbyClimbs = nearbyClimbs => {
        this.setState({ nearbyClimbs })
    }

    addUserClimbs = userClimbs => {
        this.setState({ userClimbs })
    }

    addUserClimb = userClimb => {
        this.setState({userClimbs: [...this.state.userClimbs, userClimb]})
    }

    selectClimb = selectedClimb => {
        this.setState({ selectedClimb })
    }

    deleteClimb = climbId => {
        const newUserClimbs = this.state.userClimbs.filter(climb => {
            // return climb.id !== parseInt(plant)
            return climb.id !== climbId
        })
        this.setState({ userClimbs: [...newUserClimbs] }, () => {
        })
    }


    render() {
        const value = {
            weather: this.state.weather,
            locations: this.state.locations,
            nearbyClimbs: this.state.nearbyClimbs,
            userClimbs: this.state.userClimbs,
            selectedClimb: this.state.selectedClimb,
            addWeather: this.addWeather,
            addLocations: this.addLocations,
            addNearbyClimbs: this.addNearbyClimbs,
            addUserClimbs: this.addUserClimbs,
            addUserClimb: this.addUserClimb,
            selectClimb: this.selectClimb,
            deleteClimb: this.deleteClimb
        }

        return (
            <ClimbingContext.Provider value={value}>
                {this.props.children}
            </ClimbingContext.Provider>
        )
    }
}