import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import firebase from "firebase"
import fire from '../../Fire'


class App extends Component {
    constructor(props) {
      super(props)
      this.state = { 
          text: "", 
          messages: [],
          chat: []
         }
    }
    // componentDidMount() {
    //     var firebaseConfig = {
    //         apiKey: "AIzaSyDWpOziiBhAmxB-mylJys5a4WZsOeJzwLY",
    //         authDomain: "bark-hackathon.firebaseapp.com",
    //         databaseURL: "https://bark-hackathon.firebaseio.com",
    //         projectId: "bark-hackathon",
    //         storageBucket: "bark-hackathon.appspot.com",
    //         messagingSenderId: "895115782826",
    //         appId: "1:895115782826:web:adb0624854db0cd762fed3",
    //         measurementId: "G-WD5K5VC19E"
    //       };
    //   firebase.initializeApp(firebaseConfig)
    //   this.getMessages()
    // }
  
    onSubmit = event => {
      if (event.charCode === 13 && this.state.text.trim() !== "") {
        this.writeMessageToDB(this.state.text)
        this.setState({ text: "" })
      }
    }

   
  
    writeMessageToDB = message => {
      firebase
        .database()
        .ref("messages/")
        .push({
          sender: message
        })
    }
  

  
    getMessages = () => {
        const messagesDB = firebase
        .database()
        .ref("messages/")
        .limitToLast(500)
      messagesDB.on("value", snapshot => {
        let newMessages = []
        snapshot.forEach(child => {
          var message = child.val()
          newMessages.push({ id: child.key, sender: message.sender })
        })
        this.setState({ messages: newMessages })
        this.bottomSpan.scrollIntoView({ behavior: "smooth" })
      })
    }
  
    renderMessages = () => {
      return this.state.messages.map(message => (
        <ListItem>
          <ListItemText
            style={{ wordBreak: "break-word" }}
            primary={message.text}
          />
        </ListItem>
      ))
    }
  
    render() {
      return (
        <div className="App">
          <List>
              {this.renderMessages()}
          </List>
          <TextField
            autoFocus={true}
            multiline={true}
            rowsMax={3}
            placeholder="Type something.."
            onChange={event => this.setState({ text: event.target.value })}
            value={this.state.text}
            onKeyPress={this.onSubmit}
            style={{ width: "98vw", overflow: "hidden" }}
          />
          <span ref={el => (this.bottomSpan = el)} />
        </div>
      )
    }
  }
  
  export default App