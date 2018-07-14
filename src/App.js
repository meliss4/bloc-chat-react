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
  render() {
    return (
      <div className="app">
      <div className="sidebar">
        <RoomList firebase={firebase}/>
      </div>

      <div className="main">
      <MessageList firebase={firebase}/>
      </div>
      </div>
    );
  }
}

export default App;
