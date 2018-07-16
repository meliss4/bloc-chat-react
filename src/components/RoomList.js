import React, { Component } from 'react';

class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: [], 
            new_room: ''
          };
          this.roomsRef = this.props.firebase.database().ref('rooms');
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

      //create new room 
      newRoom(e) {
        e.preventDefault();
          this.roomsRef.push({ name: this.state.new_room });

    }

      //push new room to firebase
      handleChange(e) {
        this.setState( { new_room: e.target.value })
        //   console.log(e.target.value)
      }

      render() {
        return(
          <div className="chatApp">
          <div className="chatMessage .col-3">
          <h3>Bloc Chat</h3>
          {/* room list and active room onClick */}
            {this.state.rooms.map(( room ) => <p key={ room.key } onClick={() => this.props.setActiveRoom(room)}>{room.name}</p>
            )}
          </div>
          <div className='roomNav .col-3'>
          {/* create new room input and submit */}
            <form onSubmit={ (e) => this.newRoom(e) }>
                <input type="text" value={this.state.new_room} onChange={(e) => this.handleChange(e) }/>
                <input type="submit" value="Create New Room"  />
            </form>
          </div>

          </div>
        );
    }
}

export default RoomList;