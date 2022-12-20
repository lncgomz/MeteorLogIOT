import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import { Component } from 'react';
import { Chart } from 'primereact/chart';
import IMeteorlogData from '../types/meteorlog.type';
import moment from 'moment';

type Props = {
    logs: Array<IMeteorlogData>
};

type State = {
    measures: Array<any>,
    currentDate: String
};

export class MeteorlogChart extends Component<Props, State> {
    basicData: { labels: string[]; datasets: { label: string; backgroundColor: string; data: number[]; }[]; };
    options: { basicOptions: { maintainAspectRatio: boolean; aspectRatio: number; plugins: { legend: { labels: { color: string; }; }; }; scales: { x: { ticks: { color: string; }; grid: { color: string; }; }; y: { ticks: { color: string; }; grid: { color: string; }; }; }; }; };

    constructor(props: Props) {
        super(props);

        this.basicData = {
            labels: [],
            datasets: []
        };
        this.options = this.getLightTheme();
    }
    public componentDidMount(): void {
        this.generateAxis(this.props.logs);
    }

    getLightTheme() {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions
        }
    }

    generateAxis(rawRows: Array<IMeteorlogData>) {
        let dates = new Set(rawRows.map(row => moment(row.createdAt).format('YYYY/MM/DD')));
        this.basicData.labels = Array.from(dates.values());
        let tempValues = [];
        let humValues = [];
        for (const row of Array.from(dates.values())) {
            let subData = rawRows.filter(rr => moment(rr.createdAt).format('YYYY/MM/DD') === row);
            const subDataLength = subData.length;
            const tempSum = subData.reduce((accumulator, current) => {
                return accumulator + current.temperature;
            }, 0);
            tempValues.push(tempSum / subDataLength);
            const humSum = subData.reduce((accumulator, current) => {
                return accumulator + current.humidity;
            }, 0);
            humValues.push(humSum / subDataLength);
        }
        const currentMeasures =
            [{
                label: 'Temperature (°C)',
                backgroundColor: '#F40909',
                data: tempValues
            },
            {
                label: 'Humidity (%)',
                backgroundColor: '#42A5F5',
                data: humValues
            }];
        this.basicData.datasets = currentMeasures;
    }

    render() {
        const { basicOptions } = this.options;

        return (
            <div>
                <div className="card">
                    <Chart type="bar" data={this.basicData} options={basicOptions} />
                </div>
            </div>
        )
    }
}