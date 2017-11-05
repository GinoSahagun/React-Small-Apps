import React, { Component } from 'react';

var firebase = require('firebase');
var uuid = require('uuid');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyASbnkZa7OZpAWrP46-IxqoZALc0PL7lUE",
    authDomain: "usurvey-98a35.firebaseapp.com",
    databaseURL: "https://usurvey-98a35.firebaseio.com",
    projectId: "usurvey-98a35",
    storageBucket: "usurvey-98a35.appspot.com",
    messagingSenderId: "939295533068"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
    constructor (props){
        super(props);

        this.state = {
            uuid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
            
        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }
    nameSubmit (event) {
     var studentName = this.refs.name.value;
     this.setState({studentName: studentName}, () => {
        console.log(this.state);
     });
    }
    answerSelected (event) {
        //TODO
        var answers = this.state.answers;

        if (event.target.name === 'answer1')
        {
            answers.answer1 = event.target.value;
        }
        else if (event.target.name === 'answer2')
        {
            answers.answer2 = event.target.value;
        }
        else if (event.target.name === 'answer3')
        {
            answers.answer3 = event.target.value;
        }

        this.setState({answers: answers}, () => {
            console.log(this.state.answers);
        });
    }
    questionSubmit (event) {
        firebase.database().ref('Usurvey/'+this.state.uuid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        this.setState({isSubmitted: true});
    }
    render() {
        var studentName;
        var questions;

        
        if (this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h1>Hey Student, What is Your Name?</h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="namy" type="text" placeholder="Enter Your Name" ref="name"/>
                </form>
            </div>;
            questions = null;
        }
        else if (this.state.studentName !== '' && this.state.isSubmitted === false)
        {
            studentName = <h1 className="underline">Welcome to U-survey, {this.state.studentName}</h1>;
            questions = <div>
                <h2>Here are Some Questions</h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of courses do you like the most?</label>
                        <br />
                        <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
                        <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
                        <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
                    </div>
                    <div className="card">
                        <label>You are a:  {this.state.answers.answer2}.</label>
                        <br />
                        <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>Student
                        <input type="radio" name="answer2" value="In-Job" onChange={this.answerSelected}/>In-Job
                        <input type="radio" name="answer2" value="Looking" onChange={this.answerSelected}/>Looking
                    </div>
                    <div className="card">
                        <label>Is Online Learning Helpful?</label>
                        <br />
                        <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/>Yes
                        <input type="radio" name="answer3" value="No" onChange={this.answerSelected}/>No
                        <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/>Maybe
                    </div>
                <input className="feedback-button" type="submit" value="Submit" />
                </form>
            </div>
        }
        else if (this.state.isSubmitted === true)
        {
            studentName = <h1>Thanks, {this.state.studentName}</h1>
            questions = null;
        }

        return (
            <div>
               {studentName}
               
               {questions}
            </div>
        );
    }
}

export default Usurvey;