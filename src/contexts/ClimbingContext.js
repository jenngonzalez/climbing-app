import React from 'react';

const ClimbingContext = React.createContext({
    weather: null,
    climbs: [],
    addWeather: () => {},
    addClimbs: () => {}
})

export default ClimbingContext

export class ClimbingProvider extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            weather: [],
            climbs: []
        }
    }

    addWeather = weather => {
        this.setState({
            weather: weather
        })
    }

    addClimbs = climbs => {
        this.setState({ climbs })
    }


    render() {
        const value = {
            weather: this.state.weather,
            climbs: this.state.climbs,
            addWeather: this.addWeather,
            addClimbs: this.addClimbs
        }

        return (
            <ClimbingContext.Provider value={value}>
                {this.props.children}
            </ClimbingContext.Provider>
        )
    }
}