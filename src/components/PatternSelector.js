import '../App.css';
import React, {Component} from 'react';
import LEDStripDataService from '../service/ledStripDataService';


class PatternSelector extends Component {

    constructor(props) {

        super(props);
        this.state = {
            pattern: this.props.pattern
        }

        this.dataAccessObject = new LEDStripDataService();
        this.scheme = `http://`;
        this.base_url = `localhost:8080`;
    }

    updatePatternSelectorState(value) {
        this.setState({pattern: value})
    }

    updatePattern(){
        let newPattern = {
            "new-pattern": this.state.pattern
          };
          let endpoint = "/pattern"
          fetch(`${this.scheme}${this.base_url}${endpoint}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPattern)
          })
          .then((resp) => {
            if(resp.ok){
                this.props.handler(this.state.pattern);
            }
            });

          
    }

    componentDidMount() {
        this.setState({pattern: this.props.pattern})
    }


    render() {
        return (
            <div className=''>
                <div>
                    <span className="section-header"> Pattern Selector: </span>
                </div>
                <div>
                   <span>Current pattern: {this.props.pattern}</span> 
                </div>
                <select onChange={(event) => this.updatePatternSelectorState(event.target.value)}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    {this.props.allPatterns.map((pattern, key) => {
                        return(
                            <option key={key} value={pattern}>{pattern}</option>
                        );
                    })}
                </select>
                <button onClick={() => this.updatePattern()}>
                    Submit
                </button>
            </div>
        )
    }
}

export default PatternSelector