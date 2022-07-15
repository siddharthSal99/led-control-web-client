import '../App.css';
import React, {Component} from 'react';
import TimePicker from 'react-time-picker';
import config from '../config/config';


class TimeSetter extends Component {

    constructor(props) {

        super(props);
        this.state = {
            time: this.props.time,
            prevTime: this.props.time
        }

        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
        this.jsonUpdate = this.props.jsonUpdateString;
        this.endpoint = this.props.endpoint;
    }

    updateTimeSetterState(value) {
        this.setState({time: `${value}:00`})
    }

    updateTime(){
        let newTime = `{"${this.jsonUpdate}":"${this.state.time}"}`
        
        fetch(`${this.scheme}${this.base_url}${this.endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(newTime))
        })
        .then((resp) => {
            if(!resp.ok){
                alert("time not changed correctly")
            } else {

            }
        });

          
    }

    render() {
        return (
            <div>
                <TimePicker onChange={(value) => this.updateTimeSetterState(value)} openClockOnFocus={false} format='HH:mm:ss' value={this.props.time}/>
                <button onClick={() => this.updateTime()}>
                    Submit
                </button>
            </div>
            
        )
    }

}

export default TimeSetter