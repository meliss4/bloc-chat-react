import React, { Component } from 'react';

class MessageList extends Component{
    constructor(props){
        super(props);
        this.messageRef = this.props.firebase.database().ref('messages');
        this.state = {
            username: [], 
            content: [],
            sentAt: [],
            roomId: []
          };
    }

    componentDidMount() {
        const orderRef = this.messageRef.orderByChild
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            new_message: ''
          });
      }


      render() {
        return(
            <div className='messageApp'>
            <div className='messageArea'>
            <h3>Bloc Chat Messages</h3>

            </div>
            </div>
        );
    }
}

export default MessageList;