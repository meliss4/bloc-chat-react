import React, { Component } from 'react';

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            username: '',
            content: '',
            sentAt: '',
            roomId: ''
          };

          this.messagesRef = this.props.firebase.database().ref('messages');
          this.handleChange = this.handleChange.bind(this);
          this.createMessage = this.createMessage.bind(this);
    }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
        username: this.props.user.displayName,
        content: e.target.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.setActiveRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
        username: this.state.username,
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: this.state.roomId
    });
    this.setState({ username: '', content: '', sentAt: '', roomId: ''});
  }

  deleteMessage(message){
      this.messagesRef.child(message.key).remove();
      const index = this.state.messages.indexOf(message);
      this.state.messages.splice(index, 1);
      this.setState({messages: this.state.messages})
  }

  editMessage(){

  }

      render() {
        return(
            <div className='container-fluid'>
            <div className="row">
              <ul>
              {this.state.messages.map((message) => {
                  if (message.roomId === this.props.setActiveRoom) {
                      return <li key={message.key }>{message.content} <button className="deletebtn btn-danger pull-right" onClick={ () => this.deleteMessage(message)}>x</button><br /><span className="username"><em>{message.username}</em></span></li> 
                    }
                    null;
                })
                }
              </ul>
              <div className="w-100">
               <form className="newMessage" onSubmit={this.createMessage} > <br />
               <input className="messageBox" type="textarea" value={this.state.content} onChange={this.handleChange} />
               <input className="messageSubmit" type="submit" value="Send"/>
               </form>
               </div>
            </div>
            </div>
        );
    }
}

export default MessageList;