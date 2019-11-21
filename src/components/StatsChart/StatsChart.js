import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import moment from 'moment';

// send props in when called from stats component

  
export default class StatsChart extends Component {

    render() {
        console.log('data props', this.props.data)
      return (
        <VictoryChart
            theme={VictoryTheme.material}
        >
            <VictoryAxis crossAxis
                width={200}
                height={200}
                offsetY={45}
                standalone={false}
                tickFormat={(x) => (moment(x).format("MM DD YY"))}
                label='DATE'
                style={{
                    axis: {stroke: 'white'},
                    axisLabel: {fontSize: 12, padding: 35, fill: "white"},
                    grid: {stroke: "042b34"},
                    ticks: {stroke: "042b34", size: 5},
                    tickLabels: {fontSize: 15, padding: 5, angle: 45, fill: "00FFC4"}
                }}
            />
            <VictoryAxis dependentAxis crossAxis
                width={200}
                height={200}
                domain={[0, 15]}
                offsetX={45}
                standalone={false}
                label="CLIMB GRADE"
                style={{
                  axis: {stroke: 'white'},
                  axisLabel: {fontSize: 12, padding: 30, fill: 'white'},
                  grid: {stroke: "042b34"},
                  ticks: {stroke: "042b34", size: 5},
                  tickLabels: {fontSize: 15, padding: 5, fill: "00FFC4"}
                }}
            />

            <VictoryLine
                style={{
                data: { stroke: "#00FFC4" }
                }}
                data={this.props.data}
            />
        </VictoryChart>
      )
    }
}