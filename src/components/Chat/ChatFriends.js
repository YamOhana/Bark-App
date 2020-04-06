import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat'
import MainChat from './MainChat'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
const firebase = require("firebase");

const ChatFriends = inject("MainStore")(observer((props) => {


    const drawerWidth = 200;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginRight: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));

    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider /> Friends List
            <List>
                {props.MainStore.curFriends.map(f => { return f.dogs.map(d => <MainChat d={d} o={f} />) }).map((text, index) => (
                    <ListItem button key={text}>

                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />

        </div>
    );

    const buildDocKey = (friend) => [props.MainStore.owner, friend].sort().join(':');


    const newChatSubmit = async (chatObj) => {
        const docKey = this.buildDocKey(chatObj.sendTo);
        await
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .set({
                    messages: [{
                        message: chatObj.message,
                        sender: props.MainStore.curUser
                    }],
                    users: [props.MainStore.curUser, chatObj.sendTo],
                    receiverHasRead: false
                })
        this.selectChat(props.MainStore.chats - 1);
    }



    // const goToChat = async (docKey, msg) => {
    //     const usersInChat = docKey.split(':')
    //     const chat = this.props.MainStore.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)))
    //     this.props.MainStore.chats.push(chat)

    // }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <Toolbar position="fixed" className={classes.appBar}>
                <ChatIcon
                    position="fixed"
                    className={classes.appBar}
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </ChatIcon>

            </Toolbar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Chat with your friends!
        </Typography>

            </main>
        </div>
    )
}
))

export default ChatFriends;

//  {props.MainStore.curFriends.map(f => {
//        return f.dogs.map(d => <MainChat d={d} o={f} />)
// })
// } 