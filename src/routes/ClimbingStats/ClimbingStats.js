import React, { Component } from 'react';
import ClimbingContext from '../../contexts/ClimbingContext';
import GetUserClimbs from '../../services/get-user-climbs-api-service';
import './ClimbingStats.css';

export default class ClimbingStats extends Component {

    static contextType = ClimbingContext

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
                }).catch(err => {
                    console.log(err)
                    throw err
                })
        }
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

        return (
            <div className='climbing-stats'>
                <div className='stats'>
                    <h3>YOUR OVERALL &#9660;</h3>
                    <section className='best'>
                        BEST
                        <span className='grade'>
                            V{maxGrade}
                        </span>
                    </section>
                    <section className='average'>
                        AVERAGE
                        <span className='grade'>
                            V{avgGrade}
                        </span>
                    </section>
                </div>
                <div className="graph">graph coming soon!</div>
            </div>
        )
    }
}