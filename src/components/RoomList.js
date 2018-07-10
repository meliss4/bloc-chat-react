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
            <div className='app'>
            <div className='sidenav'>
            <h3>Bloc Chat</h3>
            {
this.state.rooms.map((list, index) => <p className='rooms' key={index}>{list.name}</p>
)}
            </div>
            </div>
        );
    }
}

export default RoomList;