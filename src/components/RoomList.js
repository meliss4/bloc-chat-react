import React, { Component } from 'react';

export class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: []
          };
          this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
      }

      render() {
        return(
            <div class='app'>
            <div class='sidenav'>
            <h3>Bloc Chat</h3>
            {
this.state.rooms.map((indexedDB) => <p className='rooms' key={indexedDB}>{indexedDB.name}</p>
)}
            </div>
            </div>
        );
    }
}

export default RoomList;