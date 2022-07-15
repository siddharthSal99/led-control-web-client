import '../App.css';
import React, {Component} from 'react';
import LEDStripDataService from '../service/ledStripDataService';
import config from '../config/config';

class Login extends Component {

    constructor(props) {

        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.dataAccessObject = new LEDStripDataService();
        this.scheme = config.baseScheme;
        this.base_url = config.baseURL;
    }

    updateUsername(value) {
        this.setState({username: value})
    }

    updatePassword(value) {
        this.setState({password: value})
    }

    

    callLogin(){
        let newLoginAttempt = {
            "username": this.state.username,
            "password": this.state.password
          };
          let endpoint = "/login"
          fetch(`${this.scheme}${this.base_url}${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLoginAttempt)
          })
        .then((resp) => {
            if(resp.ok){
                return resp.json();
            }
            })
        .then((json) => {
            this.props.handler(json.success === "true");
        });
    }

    componentDidMount() {
        this.callLogin();
    }

    render() {
        return (
            <div className="login-wrapper">
            <h1>Please log into the LED Strip Dashboard</h1>
            <form>
              <label>
                <p>Username</p>
                <input onChange={(event) => {this.updateUsername(event.target.value)}} type="text" />
              </label>
              <label>
                <p>Password</p>
                <input onChange={(event) => {this.updatePassword(event.target.value)}} type="password" />
              </label>
              <div>
                <button onClick={() => this.callLogin()} type="submit">Submit</button>
              </div>
            </form>
          </div>
        )
    }

}

export default Login