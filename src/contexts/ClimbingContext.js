import React from 'react';

const ClimbingContext = React.createContext({
    currentWeather: [],
    dailyWeather: [],
    locations: [],
    nearbyClimbs: [],
    userClimbs: [],
    addCurrentWeather: () => {},
    addDailyWeather: () => {},
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
            currentWeather: [],
            dailyWeather: [],
            locations: [],
            nearbyClimbs: [],
            userClimbs: [],
            selectedClimb: null
        }
    }

    addCurrentWeather = currentWeather => {
        this.setState({ currentWeather })
    }

    addDailyWeather = dailyWeather => {
        this.setState({ dailyWeather })
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
            return climb.id !== climbId
        })
        this.setState({ userClimbs: [...newUserClimbs] }, () => {
        })
    }


    render() {
        const value = {
            currentWeather: this.state.currentWeather,
            dailyWeather: this.state.dailyWeather,
            locations: this.state.locations,
            nearbyClimbs: this.state.nearbyClimbs,
            userClimbs: this.state.userClimbs,
            selectedClimb: this.state.selectedClimb,
            addCurrentWeather: this.addCurrentWeather,
            addDailyWeather: this.addDailyWeather,
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