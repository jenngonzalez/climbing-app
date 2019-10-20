import React, { Component } from 'react';
import './ClimbingStats.css';

export default class ClimbingStats extends Component {
    render() {
        return (
            <div className='climbing-stats'>
                <h2>STATS</h2>
                <div className='stats'>
                    <h3>MONTHLY &#9660;</h3>
                    <section className='best'>
                        BEST
                        <span className='grade'>
                            V5
                        </span>
                    </section>
                    <section className='average'>
                        AVERAGE
                        <span className='grade'>
                            V3
                        </span>
                    </section>
                </div>
                <div className="graph">GRAPH</div>
            </div>
        )
    }
}