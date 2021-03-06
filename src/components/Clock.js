import React, {Component} from "react";
import '../App.css';

class Clock extends Component {

    constructor(props){
        super(props);
        this.state = {
            days:0,
            hours:0,
            minutes: 0,
            seconds:0

        }
    }

    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
        
    }

    getTimeUntil(deadline){
        const time = Date.parse(deadline) - Date.parse(new Date());
        const seconds = Math.floor((time/1000)%60);
        const minutes = Math.floor((time/1000/60)%60);
        const hours = Math.floor((time/1000/60/60)%24);
        const days = Math.floor((time/1000/60/60/24));

        this.setState({days: days, hours:hours, minutes:minutes, seconds:seconds})
    }

    leadingZero(num) {
       return num < 10 ? '0' + num : num
    }

    render (){

        // this.getTimeUntil(this.props.deadline);


        return (
            <div>
                <div>days : {this.leadingZero(this.state.days)}</div>
                <div>hours : {this.leadingZero(this.state.hours)}</div>
                <div>minutes : {this.leadingZero(this.state.minutes)}</div>
                <div>seconds : {this.leadingZero(this.state.seconds)}</div>
            </div>
        )
    }
}

export default Clock