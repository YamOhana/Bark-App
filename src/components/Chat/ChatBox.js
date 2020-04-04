import React, { Component, Profiler } from 'react'
import firebase from 'firebase';
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import Grid from '@material-ui/core/Grid'
import { observer, inject } from 'mobx-react'




@inject("MainStore")

class Chat extends Component{

    constructor(props) {
        super(props)
        this.state = { text: "", messages: [] }
      }

    


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
            text: message
          })
      }


      getMessages = () => {
        var messagesDB = firebase
          .database()
          .ref("messages/")
          .limitToLast(500)
        messagesDB.on("value", snapshot => {
          let newMessages = []
          snapshot.forEach(child => {
            var message = child.val()
            newMessages.push({ id: child.key, text: message.text })
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

<Grid>



</Grid>

            <List>{this.renderMessages()}</List>
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


export default Chat
