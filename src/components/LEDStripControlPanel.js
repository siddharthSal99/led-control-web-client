import '../App.css';
import React, {Component} from 'react';
import PaletteSelector from './PaletteSelector';
import TimeSetter from './TimeSetter';
import ForceEnableSwitch from './ForceEnableSwitch';
import PatternSelector from './PatternSelector';
import LEDStripDataService from '../service/ledStripDataService';


class LEDStripControlPanel extends Component {

    constructor(props){
      super(props)
      this.state = {
        palette: "",
        colors: [],
        startTime: "",
        endTime: "",
        enabled: false,
        pattern: "",
        time: "",
        forcedState: "",
        allPalettes: [],
        allPatterns: [],
        allEnableStates: []
      }
  
      this.dataAccessObject = new LEDStripDataService();
      this.scheme = `http://`;
      this.base_url = `localhost:8080`;
  
    }
  
    initState() {
      let endpoint = "/state"; 
      fetch(`${this.scheme}${this.base_url}${endpoint}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        palette: json.palette,
        colors: json.colors,
        startTime: json["start-time"],
        endTime: json["end-time"],
        enabled: json.enabled,
        pattern: json.pattern,
        time: json.time,
        forcedState: json["forced-state"]
      }));
  
      endpoint = "/palettes/all"; 
      fetch(`${this.scheme}${this.base_url}${endpoint}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        allPalettes: json.palettes
      }));
  
      endpoint = "/patterns/all"; 
      fetch(`${this.scheme}${this.base_url}${endpoint}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        allPatterns: json.patterns
      }));
  
      endpoint = "/enable-states/all"; 
      fetch(`${this.scheme}${this.base_url}${endpoint}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        allEnableStates: json["enable-states"]
      }));
    }
  
    componentDidMount() {
      this.initState();
  
      setInterval(() => {this.getIsEnabled()}, 5000);
    }
  
    updatePaletteHandler(newPalette) {
      this.setState({palette: newPalette});
    }
  
    updatePatternHandler(newPattern) {
      this.setState({pattern: newPattern});
    }
  
    updateEnableHandler(newEnable, newForcedState) {
      this.setState({enable: newEnable, forcedState: newForcedState});
    }
  
    updateEndTimeHandler(newEndTime) {
      this.setState({endTime:newEndTime});
    }
  
    updateStartTimeHandler(newStartTime) {
      this.setState({startTime:newStartTime});
    }
  
    getIsEnabled() {
      let endpoint = "/enabled"; 
      fetch(`${this.scheme}${this.base_url}${endpoint}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        enabled: json.enabled,
      }));
    }
    
  
    render() {
      return(
        <div className='App'>
  
          <div className='page-title'>
            LED Strip Control
          </div>
          <div className='color-palette-select'>
            <PaletteSelector handler={this.updatePaletteHandler.bind(this)} allPalettes={this.state.allPalettes} palette={this.state.palette}/>
          </div>
          <div className='flex-time-pickers'>
           
            <div className='time-picker'>
              <div className='section-header'>Start Time: </div>
              <TimeSetter 
                endpoint='/startTime' 
                jsonUpdateString='new-start-time'
                handler={this.updateStartTimeHandler.bind(this)} 
                time={this.state.startTime}
              />
            </div>

            
            <div className='time-picker'>
              <div className='section-header'>End Time: </div>
              <TimeSetter 
                endpoint='/endTime' 
                jsonUpdateString='new-end-time'
                handler={this.updateEndTimeHandler.bind(this)} 
                time={this.state.endTime}
              />
            </div>
  
          </div>
          <div className='force-enable-switch'>
            <ForceEnableSwitch forcedState={this.state.forcedState} handler={this.updateEnableHandler.bind(this)} allEnableStates={this.state.allEnableStates} isEnabled={this.state.enabled}/>
          </div>
          <div className='pattern-select'>
            <PatternSelector  handler={this.updatePatternHandler.bind(this)} allPatterns={this.state.allPatterns} pattern={this.state.pattern}/>
          </div>
        </div>
      )
    }
  }
  
  export default LEDStripControlPanel