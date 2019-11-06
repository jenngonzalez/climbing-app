import React from 'react';

const ClimbingContext = React.createContext({
    weather: null,
    locations: [],
    climbs: [],
    addWeather: () => {},
    addLocations: () => {},
    addClimbs: () => {}
})

export default ClimbingContext

export class ClimbingProvider extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            weather: [],
            locations: [],
            climbs: []
        }
    }

    addWeather = weather => {
        this.setState({ weather })
    }

    addLocations = locations => {
        this.setState({ locations })
    }

    addClimbs = climbs => {
        this.setState({ climbs })
    }


    render() {
        const value = {
            weather: this.state.weather,
            locations: this.state.locations,
            climbs: this.state.climbs,
            addWeather: this.addWeather,
            addLocations: this.addLocations,
            addClimbs: this.addClimbs
        }

        return (
            <ClimbingContext.Provider value={value}>
                {this.props.children}
            </ClimbingContext.Provider>
        )
    }
}