import '../App.css';
import React, {Component} from 'react';
import config from '../config/config';


class ForceEnableSwitch extends Component {
    constructor(props) {

        super(props);
        this.state = {
            enabled: this.props.isEnabled,
            forcedState: this.props.forcedState
        }

        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateEnableSelectorState(value) {
        this.setState({forcedState: value})
    }

    componentDidMount() {
        this.setState({forcedState: this.props.forcedState})
    }

    

    updateEnable(){
        let newEnable = {
            "new-forced-state": this.state.forcedState
          };
          let endpoint = "/enable"
          fetch(`${this.scheme}${this.base_url}${endpoint}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEnable)
          })
          .then((resp) => {
            if(resp.ok){
                this.props.handler(this.state.enabled, this.state.forcedState);
            }
            });

          
    }
    

    render() {
        return (
            <div className=''>
                <div>
                <span className="section-header">Enable Selector: </span>
                </div>
                <div>
                    <div><span>Current Enable State: {this.props.forcedState}</span></div> 
                    <div><span>Is Enabled: {`${this.props.isEnabled}`}</span></div>
                </div>
                <select onChange={(event) => this.updateEnableSelectorState(event.target.value)}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    {this.props.allEnableStates.map((enable, key) => {
                        return(
                            <option key={key} value={enable}>{enable}</option>
                        );
                    })}
                </select>
                <button onClick={() => this.updateEnable()}>
                    Submit
                </button>
            </div>
        )
    }

}

export default ForceEnableSwitch