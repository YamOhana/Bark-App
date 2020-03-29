import  React,{ Component } from 'react';
import {socketio} from 'socket.io'
import './App.css';
import { observer } from 'mobx-react'
import Home from './components/Home'
import Header from './components/Header'


@observer
class App extends Component {

  componentDidMount = async () => {
    
  }





  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    )

  }
}

export default App;
