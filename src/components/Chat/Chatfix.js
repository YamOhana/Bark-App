// import React, { Component } from "react"
// import { observer, inject } from 'mobx-react'
// import PropTypes from 'prop-types';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import MainChat from './MainChat'
// import firebase from "firebase"
// import Grid from '@material-ui/core/Grid'
// import Container from '@material-ui/core/Container'
// import { InboxIcon, MailIcon, Menu, Chat, WhatsAppIcon } from '@material-ui/icons'
// import { AppBar, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography, TextField, CssBaseline } from '@material-ui/core'

// @inject("MainStore")

// @observer

// class ChatFriends extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             text: "",
//             messages: [],
//             chat: []
//         }
//     }



//     useStyles = makeStyles((theme) => ({
//         root: {
//             display: 'flex',
//         },
//         drawer: {
//             [theme.breakpoints.up('sm')]: {
//                 width: 200,
//                 flexShrink: 0,
//             },
//         },
//         appBar: {
//             [theme.breakpoints.up('sm')]: {
//                 width: `calc(100% - 200px)`,
//                 marginRight: 200,
//             },
//         },
//         menuButton: {
//             marginRight: theme.spacing(2),
//             [theme.breakpoints.up('sm')]: {
//                 display: 'none',
//             },
//         },
//         // necessary for content to be below app bar
//         toolbar: theme.mixins.toolbar,
//         drawerPaper: {
//             width: 200,
//         },
//         content: {
//             flexGrow: 1,
//             padding: theme.spacing(3),
//         },
//     }));

//     onSubmit = event => {
//         if (event.charCode === 13 && this.state.text.trim() !== "") {
//             this.writeMessageToDB(this.state.text)
//             this.setState({ text: "" })
//         }
//     }

//     writeMessageToDB = message => {
//         firebase
//             .database()
//             .ref("messages/")
//             .push({
//                 sender: message
//             })
//     }

//     getMessages =  async () => {
//         const messagesDB = firebase
//             .database()
//             .ref("messages/")
//             .limitToLast(500)
//               await messagesDB.on("value", snapshot => {
//             let newMessages = []
//             snapshot.forEach(child => {
//                 var message = child.val()
//                 newMessages.push({ id: child.key, sender: message.sender })
//             })
//             this.setState({ messages: newMessages })
//             this.bottomSpan.scrollIntoView({ behavior: "smooth" })
//         })
//     }


//     renderMessages = () => {
//         return this.state.messages.map(message => (
//             <ListItem>
//                 <ListItemText
//                     style={{ wordBreak: "break-word" }}
//                     primary={message.text}
//                 />
//             </ListItem>
//         ))
//     }


//     classes() {
//         return this.useStyles();
//     }


//     // container() {
//     //     return this.props
//     // }

//     theme() {
//         return useTheme()
//     }
//     mobileOpen() {
//         return React.useState(false)
//     }

//     setMobileOpen() {
//         return React.useState(false)
//     }

//     handleDrawerToggle = () => {
//         this.setMobileOpen(!this.mobileOpen);
//     };


//     drawer() {

//         return (
//             <div>
//                 <div className={this.classes.toolbar} />
//                 <Divider /> Friends List
//                 <List>
//                     {this.props.MainStore.curFriends.map(f => { return f.dogs.map(d => <MainChat d={d} o={f} />) }).map((text, index) => (
//                         <ListItem button key={text}>

//                             <ListItemText primary={text} />
//                         </ListItem>
//                     ))}
//                 </List>
//                 <Divider />

//             </div>
//         )
//     }

//     render() {


//         return (


//             <div> hello world


//                   <Container className={this.classes.root} >
//                      <CssBaseline />
//                      <Toolbar position="fixed" className={this.classes.appBar}>
//                          <Chat
//                             position="fixed"
//                             className={this.classes.appBar}
//                             color="inherit"
//                             aria-label="open drawer"
//                             edge="start"
//                             onClick={this.handleDrawerToggle}
//                             className={this.classes.menuButton}
//                         >
//                             <Menu />
//                         </Chat>
    
//                     </Toolbar> 

//                 <nav className={this.classes.drawer} aria-label="mailbox folders">
//                      <Hidden smUp implementation="css">
//                         <Drawer
//                             container={this.props}
//                             variant="temporary"
//                             anchor={this.theme.direction === 'rtl' ? 'left' : 'right'}
//                             open={this.mobileOpen}
//                             onClose={this.handleDrawerToggle}
//                             classes={{
//                                 paper: this.classes.drawerPaper,
//                             }}
//                             ModalProps={{
//                                 keepMounted: true, // Better open performance on mobile.
//                             }}
//                         >
//                             {this.drawer}
//                         </Drawer>
//                     </Hidden>
//                     <Hidden xsDown implementation="css">
//                         <Drawer
//                             classes={{
//                                 paper: this.classes.drawerPaper,
//                             }}
//                             variant="permanent"
//                             open
//                         >
//                             {this.drawer}
//                         </Drawer>
//                     </Hidden> 
//                  </nav> 
//                     </Container>
//                     </div>

 
// // {/* // </Container> */} 

//             //     <Grid className={this.classes.content}>
//             //         <div className={this.classes.toolbar} />


//             //         <Typography paragraph>
//             //              <List>{this.renderMessages()}</List>
//             //             <TextField
//             //                 autoFocus={true}
//             //                 multiline={true}
//             //                 rowsMax={3}
//             //                 placeholder="Type something.."
//             //                 onChange={event => this.setState({ text: event.target.value })}
//             //                 value={this.state.text}
//             //                 onKeyPress={this.onSubmit}
//             //                 style={{ width: "98vw", overflow: "hidden" }}
//             //             />
//             //             <span ref={el => (this.bottomSpan = el)} /> 
                        
//             //         </Typography>

//             //     </Grid>
//             // </Container>
//         )
//     }

// }

// export default ChatFriends



