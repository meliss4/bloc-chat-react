import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        }

        signIn(){
            const provider = new this.props.firebase.auth.GoogleAuthProvider();
            this.props.firebase.auth().signInWithPopup( provider );
        }

        signOut() {
            this.props.firebase.auth().signOut();
        }

        handleChange(user) {
            const signInStatus = user;
            if (signInStatus) {
                this.signOut();
            } else if (signInStatus === null) {
                this.signIn();
            }
        }

        componentDidMount(){
            this.props.firebase.auth().onAuthStateChanged( user => {
                this.props.setUser(user);
              });
        }

render() {
    return (
        <div className="userLogin">
            <h3> Log In or Sign Up </h3>
            <h4> {(this.props.currentUser) ?   this.props.currentUser.displayName : 'Guest'}</h4>
                <button onClick={this.signIn} onChange={(user) => this.handleChange(user)}> 
                {(this.props.currentUser) === null ?
                    <span> Sign In </span> : <span> Sign Up </span>
                }
                </button>
        </div>
            );
        }
    }

export default User;