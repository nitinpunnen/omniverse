import { Flex } from '@aws-amplify/ui-react';
import * as React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../AgentDashboard.css';

export default function ProductionLine() {
    const options = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Production, consumption and trade surplus',
            align: 'left'
        },
        xAxis: {
            categories: ['Q1 2019', 'Q2 2019', 'Q3 2019', 'Q4 2019', 'Q1 2020', 'Q2 2020',
                'Q3 2020', 'Q4 2020', 'Q1 2021', 'Q2 2021', 'Q3 2021']
        },
        yAxis: {
            title: {
                text: 'TWh'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Total production',
            data: [37.8, 29.3, 30.8, 36.8, 40.5, 35.3, 34.9, 43.6, 45.7, 35.9, 32.7
            ]
        }, {
            name: 'Gross consumption',
            data: [39.9, 29.9, 26.7, 38.1, 39.3, 30.2, 27.5, 36.7, 42.7, 31.4, 27.5
            ]
        }, {
            name: 'Trade surplus',
            data: [-2.2, -0.6, 4.1, -1.3, 1.2, 5.1, 7.4, 6.9, 2.9, 4.5, 5.2]
        }]
    }
    

    return (
        <div className="highchart-container">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}