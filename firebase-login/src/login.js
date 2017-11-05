import React, { Component } from 'react';
var firebase = require('firebase');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDAiQ439i0IoDIsCcrneerMWW5AXUoWwQA",
    authDomain: "fir-login-test-589f8.firebaseapp.com",
    databaseURL: "https://fir-login-test-589f8.firebaseio.com",
    projectId: "fir-login-test-589f8",
    storageBucket: "fir-login-test-589f8.appspot.com",
    messagingSenderId: "571538862341"
  };
  firebase.initializeApp(config);
class Login extends Component {
   constructor (props) {
    super(props);
    this.state = {
        err: ''
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
   }
   login (event) {
    const email = this.refs.email.value;
    const pass = this.refs.pass.value;
    console.log(email , pass);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);


    //TODO Handle Login Promise
    promise
    .then((user) => {
        var lout = document.getElementById('logout');
        
        lout.classList.remove('hide');

        this.setState({err: 'Welcome ' + user.email});

    })
    .catch((e) => {
        var err = e.message;
        console.log(err);
        this.setState({err: "User Not Found"});
    });

   }
   logout (){

    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    this.setState({err: ""});
    lout.classList.add('hide');
   }

   signUp (event) {
    const email = this.refs.email.value;
    const pass = this.refs.pass.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);

    promise
    .then((user) => {
        var err = "Welcome " + user.email;
        firebase.database().ref('users/' + user.uid).set({
            email: user.email
        });
        console.log(user);
        this.setState({err: err});
    })
    .catch(err => {
        console.log(err.message);
       this.setState({err: err.message}); 
    });

   }
   google (event) {

        var provider = new firebase.auth.GoogleAuthProvider();
        let promise = firebase.auth().signInWithPopup(provider);

        promise
        .then(result => {
            var user = result.user;
            console.log(result);
            firebase.database().ref('users/'+user.uid).set({
                email: user.email,
                name: user.displayName
            });
        })
        .cath(err => {
            console.log(err.message);
        });
       
   }
    render() {
        return (
            <div>
                <input id="email" type="email" ref="email" placeholder="Email" />
                <br />
                <input id="pass" type="password" ref="pass" placeholder="Password" />
                <p>{this.state.err}</p>
                <br />
                <button onClick={this.login}>Login</button>
                <button onClick={this.signUp}>Sign Up</button>
                <button onClick={this.logout} id="logout" className="hide" >Log Out</button>
                <br/>
            <button onClick={this.google} className="google" >Sign in with Google</button>
            </div>
        );
    }
}

export default Login;