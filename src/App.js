import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAExoHH655BNfUIGW5-dh4IbPukafcgEyQ",
    authDomain: "bloc-chat-23fa0.firebaseapp.com",
    databaseURL: "https://bloc-chat-23fa0.firebaseio.com",
    projectId: "bloc-chat-23fa0",
    storageBucket: "bloc-chat-23fa0.appspot.com",
    messagingSenderId: "166231256085"
  };

  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        activeRoom: '',
        user: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
    setActiveRoom(room) {
      this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user : user});
  }

  render() {
    return (
      <div className="container-fluid app">
      <div className="row">
      <div className="sidebar col-md-4">
          <div className="login">
            <User firebase={firebase} setUser={this.setUser} currentUser={this.state.user}/> 
            </div><br />
        <RoomList firebase={firebase} setActiveRoom = {this.setActiveRoom} activeRoom = {this.state.activeRoom}/>
      </div>
      <div className="chatRoomName col-md-8">
        <h3 className="chatRoomName"> Chat Room: 
          {this.state.activeRoom.name} </h3>
        { this.state.activeRoom ?
        (<MessageList firebase={firebase} setActiveRoom={this.state.activeRoom.key} currentUser={this.state.user.displayName} />) : (null)
      }
        </div>
        </div>
      </div>
    );
  }
}

export default App;
