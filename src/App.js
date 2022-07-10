import './App.css';
import React, {Component} from 'react';
import LEDStripControlPanel from './components/LEDStripControlPanel';
import Login from './components/Login';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }

  }

  updateLoginToken(loggedIn){
    this.setState({loggedIn:loggedIn});
  }



  render() {

    if (!this.state.loggedIn) {
      return (
        <div>
          <Login handler={this.updateLoginToken.bind(this)}/>
        </div>
      )
    }

    return(
      <div className='App'>
        <LEDStripControlPanel/>
      </div>
    )
  }
}

export default App
