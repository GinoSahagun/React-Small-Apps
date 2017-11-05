import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Custom React Components
import Navbar from './navbar.js';

import Header from './Header.js';

import Footer from './Footer';

import PostContainer from './Post-Container';
class App extends Component {
  render() {
    return (
      <div>

    <Navbar />

    <Header />


    <PostContainer />


    <hr />

      <Footer />
      </div>
    );
  }
}

export default App;
