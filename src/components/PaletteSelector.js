import '../App.css';
import React, {Component} from 'react';
import LEDStripDataService from '../service/ledStripDataService';

class PaletteSelector extends Component {

    constructor(props) {

        super(props);
        this.state = {
            palette: this.props.palette
        }

        this.dataAccessObject = new LEDStripDataService();
        this.scheme = `http://`;
        this.base_url = `localhost:8080`;
    }

    updatePaletteSelectorState(value) {
        this.setState({palette: value})
    }

    updatePalette(){
        let newPalette = {
            "new-palette": this.state.palette
          };
          let endpoint = "/palette"
          fetch(`${this.scheme}${this.base_url}${endpoint}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPalette)
          })
          .then((resp) => {
            if(resp.ok){
                this.props.handler(this.state.palette);
            }
            });

          
    }

    componentDidMount() {
        this.setState({palette: this.props.palette})
    }
    

    render() {
        return (
            <div className=''>
                <div>
                    <span className="section-header">Color Palette Selector: </span>
                </div>
                <div>
                   <span>Current palette: {this.props.palette}</span> 
                </div>
                <select onChange={(event) => this.updatePaletteSelectorState(event.target.value)}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    {this.props.allPalettes.map((palette, key) => {
                        return(
                            <option key={key} value={palette}>{palette}</option>
                        );
                    })}
                </select>
                <button onClick={() => this.updatePalette()}>
                    Submit
                </button>
            </div>
        )
    }

}

export default PaletteSelector