import React, { Component } from 'react';
import ClimbingContext from '../../contexts/ClimbingContext';
import './ClimbingStats.css';

export default class ClimbingStats extends Component {

    static contextType = ClimbingContext

    constructor(props) {
        super(props)
        this.state = {
            // climbGrade: this.context.userClimbs
            // TODO - map through userClimbs.grades creating an array of grades
            // map over grades, slice(1, 3) on each (this will get single and double digit #s)
            // create an array of those numbers
            // add all numbers and divide by numbers.length
            // ---> average climb grade
            // look for highest number
            // ---> best climb grade
            avgGrade: null,
            maxGrade: null
        }
    }


    componentDidMount() {
        console.log('this.context', this.context)
        console.log('context.userClimbs', this.context.userClimbs)
        const userGrades = this.context.userClimbs.map(climb => {
            return climb.climb_grade
        })
        console.log('userGrades', userGrades)
        const gradeNumbers = userGrades.map(grade => {
            return parseInt(grade.slice(1, 3))
        })
        console.log('gradeNumbers', gradeNumbers)

        const sumOfGrades =  gradeNumbers.reduce((a,b) => a + b, 0)

        console.log('sumOfGrades', sumOfGrades)

        const avgGrade = Math.round(sumOfGrades/gradeNumbers.length)
        this.setState({ avgGrade })

        console.log('avgGrade', avgGrade)

        const maxGrade =  Math.max(...gradeNumbers);
        this.setState({ maxGrade })

        console.log('maxGrade', maxGrade)

        // console.log('userClimbs from context in state', this.state.climbGrade)

        // why is context not available when component mounts?
    }


    render() {
        return (
            <div className='climbing-stats'>
                <h2>STATS</h2>
                <div className='stats'>
                    <h3>MONTHLY &#9660;</h3>
                    <section className='best'>
                        BEST
                        <span className='grade'>
                            V{this.state.maxGrade}
                        </span>
                    </section>
                    <section className='average'>
                        AVERAGE
                        <span className='grade'>
                            V{this.state.avgGrade}
                        </span>
                    </section>
                </div>
                <div className="graph">GRAPH</div>
            </div>
        )
    }
}