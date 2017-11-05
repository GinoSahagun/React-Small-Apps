import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Parent />
      </div>
    );
  }
}

class Parent extends Component {
  
  render() {
    return (
      <div>
        <h2>Just Some Info</h2>
        <Cars msg="Cars are Really Cool" model="12345" />
      </div>
    );
  }
}

Parent.default.props = {
  cars: ['BMW', 'MERC', 'AUDI', 'SUB']
}


class Cars extends Component {
  
  render() {
    console.log(this.props);
    return (
     <div>
       <h3>I Am From Cars Component</h3>
       <p>{this.props.msg}</p>
       <p>{this.props.model}</p>
     </div>
    );
  }
}


export default App;
