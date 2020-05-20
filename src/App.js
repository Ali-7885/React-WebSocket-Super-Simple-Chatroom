import React, { Component } from 'react'
import User from './User'
import Message from './Message'
import io from 'socket.io-client'
import './sass/App.scss';

class App extends Component {
 constructor (props) {
      super(props)
      this.state = {
        showChatRoom:false,
        messages:[],
        users:[],
        user:'',
        message: '',
        socket:io('http://localhost:3000')
      }
      this.handleUserChange = this.handleUserChange.bind(this)
      this.handleUserSubmit = this.handleUserSubmit.bind(this)
      this.handleMessageChange = this.handleMessageChange.bind(this)
      this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  componentDidMount() {
    this.state.socket.on(`new-mesage`, data => {
          var tempMsg=this.state.messages;
          tempMsg.push(data);
          this.setState((prevState, props) => ({
            // messages : [...prevState.messages + data]
              messages : tempMsg
          }))
    })

    this.state.socket.on(`get-users`, data => {
          this.setState((prevState, props) => ({
              users : data
            }))
    })
  }

  handleUserChange(event) {
    this.setState({user: event.target.value})
  }

  handleUserSubmit(event) {
    event.preventDefault()
    this.state.socket.emit('new-user',  this.state.user)
    this.setState({showChatRoom: true})
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value})
  }

  handleMessageSubmit(event) {
    event.preventDefault()
    this.state.socket.emit('send-message',  this.state.message)
    this.setState({message: ' '})
    event.target.value=''
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Welcome to Super Simple Chat Application<small> by WebChannel.DEV</small></h2>
        </div>

        {!this.state.showChatRoom &&
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <form id="userForm" onSubmit={this.handleUserSubmit}>
                  <div className="from-group">
                    <lable>Please select a username</lable>
                    <textarea className="form-control" id="user" value={this.state.user} onChange={this.handleUserChange} />
                    <br/>
                    <input type="submit" className="btn btn-primary" value="Start" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        }

        {this.state.showChatRoom &&
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="well">
                <h1>Online Users </h1>
                <ul className="list-group" id="users">

                {this.state.users.map((data, i) => <User  key={i+'U'} username={data}/>)}
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="chat" id="chat">
                {this.state.messages.map((data, i) =><Message  key={i+'U'}  {...data}/>)}
              </div>
              <form id="messageForm" onSubmit={this.handleMessageSubmit}>
                <div className="from-group">
                  <lable>Enter Message</lable>
                  <textarea className="form-control" id="message" value={this.state.message} onChange={this.handleMessageChange} />
                  <br/>
                  <input type="submit" className="btn btn-primary" value="Send message" />
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default App;
