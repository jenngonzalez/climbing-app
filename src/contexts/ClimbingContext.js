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
    selectClimb: () => {}
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
            selectClimb: this.selectClimb
        }

        return (
            <ClimbingContext.Provider value={value}>
                {this.props.children}
            </ClimbingContext.Provider>
        )
    }
}