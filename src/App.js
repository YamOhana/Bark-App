import React, { Component } from 'react';
// import { socketio } from 'socket.io'
import './App.css';
import { observer } from 'mobx-react'
import fire from './Fire';
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header'


@observer
class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  
  render() {
    return (
      <div className="App">
        <div>
        <Header />
        {this.state.user ? (<Home />) : (<Login />)}
        </div>
      </div>
    )
  }
}

export default App;
