import React, { Component } from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
import StatsChart from '../../components/StatsChart/StatsChart';
import ClimbingContext from '../../contexts/ClimbingContext';
import GetUserClimbs from '../../services/get-user-climbs-api-service';
import './ClimbingStats.css';

export default class ClimbingStats extends Component {

    static contextType = ClimbingContext

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null
        }
    }

    componentDidMount() {
        if(!this.context.userClimbs.length) {
            this.setState({
                loading: true
            })
            GetUserClimbs.getClimbs()
                .then(climbData => {
                    const userClimbs = climbData.map(climb => {
                        return {
                            id: climb.id,
                            date: climb.date,
                            location: climb.location,
                            climb_name: climb.climb_name,
                            climb_type: climb.climb_type,
                            climb_grade: climb.climb_grade,
                            user_status: climb.user_status,
                            image: climb.image
                        }
                    })
                    this.context.addUserClimbs(userClimbs)
                    this.setState({ loading: false })
                }).catch(res => {
                    this.setState({ loading: false, error: res.error })
                })
        }
    }

    renderChartData = () => {
        const userData = this.context.userClimbs.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateA - dateB;
        })

        const data = []
        userData.map(climb => {
            return data.push({
                x: moment(climb.date).format(),
                y: parseInt(climb.climb_grade.slice(1, 3))
            })
        })
        return data
    }


    render() {
        const userGrades = this.context.userClimbs.map(climb => {
            return climb.climb_grade
        })
        const gradeNumbers = userGrades.map(grade => {
            return parseInt(grade.slice(1, 3))
        })
        const sumOfGrades =  gradeNumbers.reduce((a,b) => a + b, 0)
        const avgGrade = Math.round(sumOfGrades/gradeNumbers.length)
        const maxGrade =  Math.max(...gradeNumbers);

        const data = this.renderChartData()

        const { error } = this.state

        return (
            <div className='climbing-stats'>
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                {this.state.loading && <p className='loading'>Loading ...</p>}
                {!this.context.userClimbs.length && <p className='add-message'>Add a few of your completed climbs to see your stats!</p>}
                <div className='stats'>
                    <h3>YOUR OVERALL
                        <div className="tooltip">&#9660;
                            <span className="tooltiptext">Date-based stat tracking coming soon!</span>
                        </div>
                    </h3>
                    <section className='best'>
                        BEST
                        <span className='grade'>
                            V{!this.context.userClimbs.length ? '?' : maxGrade}
                        </span>
                    </section>
                    <section className='average'>
                        AVERAGE
                        <span className='grade'>
                            V{!this.context.userClimbs.length ? '?' : avgGrade}
                        </span>
                    </section>
                </div>
                <div className="chart">
                    <StatsChart data={data} />
                </div>
            </div>
        )
    }
}