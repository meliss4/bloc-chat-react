import React, { Component } from 'react';

class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: [], 
            new_room: '',
          };
          this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ), 
            new_room: '',
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

      deleteRoom(room){
        this.roomsRef.child(room.key).remove();
        const indexRoom = this.state.rooms.indexOf(room);
        this.state.rooms.splice(indexRoom, 1);
        this.setState({rooms: this.state.rooms})
    }

      render() {
        return(
          <div className="chatApp .navbar-fixed-left h-100 d-inline-block col-md-3">
          <div className="chatMessage">
          <h3>Bloc Chat</h3>
          {/* room list and active room onClick */}
            {this.state.rooms.map(( room ) => 
            <p key={ room.key } onClick={() => 
              this.props.setActiveRoom(room)}>{room.name}
              <button className="tn btn-danger btn-sm" onClick={ () => this.deleteRoom(room)}>x</button>
              </p>
            )}
          </div>
          <div className='roomNav'>
          {/* create new room input and submit */}
            <form onSubmit={ (e) => this.newRoom(e) }>
                <input type="text" value={this.state.new_room} onChange={(e) => this.handleChange(e) }/>
                <input type="submit" value="Create New Room"  />
            </form>
          </div>
        <div>
          <p></p>
        </div>
          </div>
        );
    }
}

export default RoomList;