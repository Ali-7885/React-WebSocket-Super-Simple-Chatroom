import React, { Component } from 'react'
import io from 'socket.io-client'
// import logo from './img/logo.svg';
import './sass/App.scss';

class App extends Component {
   constructor () {
    super()
    this.state = {
      messages:[],
      socket:io('http://localhost:3000')
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Welcome Super Simple Chat Application</h2>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="well">
                <h1>Online Users </h1>
                <ul className="list-group" id="users"></ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="chat" id="chat"></div>
              <from id="messageForm">
                <div className="from-group">
                  <lable>Enter Message</lable>
                  <textarea className="form-control" id="message"/>
                  <br/>
                  <input type="submit" className="btn btn-primary" value="Send message"/>
                </div>
              </from>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
