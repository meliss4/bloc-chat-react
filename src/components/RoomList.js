import React, { Component } from 'react';

export class RoomList extends Component{
    constructor(props){
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
            rooms: []
          };
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ), 
            new_room: ''
          });
        });
      }

      newRoom(e) {
          e.preventDefault();
            this.roomsRef.push({ name: this.newRoomRef });
      }

      pushNewRoom(e) {
          this.setState( { new_room: e.target.value })
          this.newRoomRef = this.state.new_room;
      }

      render() {
        return(
            <div className='navigation'>
            <div className='sidenav'>
            <h3>Bloc Chat</h3>
            {
                this.state.rooms.map((list, index) => <p className='rooms' key={index}>{list.name}</p>
)}
            </div>

            <form onSubmit={ (e) => this.newRoom(e) }>
                <input type="text" value={this.state.newRoomRef} onChange={(e) => this.pushNewRoom(e) }/>
                <input type="submit" value="Create New Room"  />
            </form>
            </div>
        );
    }
}

export default RoomList;