import  React,{ Component } from 'react';
import {socketio} from 'socket.io'
import './App.css';
import { observer } from 'mobx-react'


@observer
class App extends Component {

  constructor(){

    super()
    this.state = {
      chosenDog: {}
    }
  }


  componentDidMount = async () => {

    
  }





  render() {
    return (
      <div className="App">
        
      </div>
    )

  }
}

export default App;
