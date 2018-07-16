import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

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
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }
    setActiveRoom(room) {
      this.setState({ activeRoom: room });
  }


  render() {
    return (
      <div className="app">
      <div className="sidebar .col-25%">
        <RoomList firebase={firebase} setActiveRoom = {this.setActiveRoom} activeRoom = {this.state.activeRoom}/>
      </div>
      <div className="chatMessage  .col-75%">
      <h2> Chat Room: {this.state.activeRoom.name} </h2>
        { this.state.activeRoom ?
        (<MessageList firebase={firebase} setActiveRoom={this.state.activeRoom.key} />) : (null)
        }
      </div>
      </div>
    );
  }
}

export default App;
