import React from 'react';
import { observer, inject } from 'mobx-react'

import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import NewChatStyle from './NewChatStyle'
const firebase = require("firebase");

inject("MainChat")
class NewChatComponent extends React.Component {

    constructor() {

        super()
        this.state = {
            username: null,
            message: null
        }

    }


    render() {

        const { classes } = this.props

        return (
            <main className={classes.main}>
                <CssBaseline />

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Send a Message</Typography>

                    <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chat-username'>
                                Enter Your Friends Name
                </InputLabel>
                            <Input required
                                className={classes.Input}
                                autoFocus
                                onChange={(e) => this.userTyping('username', e)}
                                id='new-chat-username'>
                            </Input>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chat-message'>
                                Enter Your Message
                    </InputLabel>
                            <Input required
                                className={classes.input}
                                onChange={(e) => this.userTyping('message', e)}
                                id='new-chat-message'>
                            </Input>
                        </FormControl>

                <Button fullWidth variant='contained' color='primary' className={classes.submit} type='submit'>Send</Button>
                    </form>
                </Paper>
            </main>


        )
    }

    userTypig =(inputType, e) => {

        switch (inputType){
            case username:
                this.setState({username: e.target.value})
                break;


                case message:
                    this.setState({message: e.target.value})
                    break;

                    default:
                        break;
        }
    }


    submitNewChat = async (e) => {
        e.preventDefault();
        const userExists = await this.userExists()
        if(userExists){
            const chatExists = await this.chatExists()
            chatExists ? this.goToChat() : this.createChat
        }
    }
    

    buildDocKey = () => [props.MainStore.curUser.firstName, this.state.username].sort().join(':');

    createChat= () => {

        this.props.newChatSubmitFn({
            sendTo: this.state.username,
            message: this.state.message
        })
    }


    goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message)

    chatExists = async () => {
        const docKey = this.buildDocKey();
        const chat = await
        firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .get()
        console.log(chat.exists)
        return chat.exists
    }


    userExists = async () => {
        const usesSnapshot = await
        firebase
        .firestore()
        .collection('users')
        .get();
        const exists = usesSnapshot
        .docs
        .map(_doc => _doc.data().firstName)
        .includes(this.state.username);
        this.setState({ serverError: !exists})
        return exists
    }

}


export default withStyles(styles)(NewChatComponent);
