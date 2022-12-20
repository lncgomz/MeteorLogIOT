import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import { Component } from 'react';
import { Card } from 'primereact/card';
import IMeteorlogData from '../types/meteorlog.type';
import moment from 'moment';

type Props = {
    logs: Array<IMeteorlogData>
};

type State = {};

export class MeteorlogCards extends Component<Props, State> {
    maximumTemp: IMeteorlogData = this.emptyMeteorData();
    minimumTemp: IMeteorlogData = this.emptyMeteorData();
    maximumHum: IMeteorlogData = this.emptyMeteorData();
    minimumHum: IMeteorlogData = this.emptyMeteorData();

    constructor(props: Props) {
        super(props);
        this.processData(this.props.logs);
    }

    processData(rawRows: Array<IMeteorlogData>) {
        this.maximumTemp = rawRows.reduce((prev, current) => (prev.temperature > current.temperature) ? prev : current);
        this.minimumTemp = rawRows.reduce((prev, current) => (prev.temperature < current.temperature) ? prev : current);
        this.maximumHum = rawRows.reduce((prev, current) => (prev.humidity > current.humidity) ? prev : current);
        this.minimumHum = rawRows.reduce((prev, current) => (prev.humidity < current.humidity) ? prev : current);
    }

    formatDate(rawDate: Date): string {
        return moment(rawDate).format('YYYY/MM/DD HH:mm')
    }

    emptyMeteorData(): IMeteorlogData {
        return {
            id: -1,
            deviceId: "0",
            temperature: 0,
            humidity: 0,
            createdAt: new Date()
        };
    }

    render() {
        return (
            <div className="row">
                <Card title="Min Temperature" className="col-3" style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0 minValue" style={{ lineHeight: '1.5' }}>{this.minimumTemp.temperature} °C</p>
                    <p className="m-0 dateValue" style={{ lineHeight: '1.5' }}>{this.formatDate(this.minimumTemp.createdAt)}</p>
                </Card>
                <Card title="Max Temperature" className="col-3" style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0 maxValue" style={{ lineHeight: '1.5' }}>{this.maximumTemp.temperature} °C</p>
                    <p className="m-0 dateValue" style={{ lineHeight: '1.5' }}>{this.formatDate(this.maximumTemp.createdAt)}</p>
                </Card>
                <Card title="Min Humidity" className="col-3" style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0 minValue" style={{ lineHeight: '1.5' }}>{this.minimumHum.humidity}%</p>
                    <p className="m-0 dateValue" style={{ lineHeight: '1.5' }}>{this.formatDate(this.minimumHum.createdAt)}</p>
                </Card>
                <Card title="Max Humidity" className="col-3" style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0 maxValue" style={{ lineHeight: '1.5' }}>{this.maximumHum.humidity}%</p>
                    <p className="m-0 dateValue" style={{ lineHeight: '1.5' }}>{this.formatDate(this.maximumHum.createdAt)}</p>
                </Card>
            </div>
        )
    }
}