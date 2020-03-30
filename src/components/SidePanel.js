import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import EmojiPeople from '@material-ui/icons/EmojiPeople'
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    },
    toolbar: theme.mixins.toolbar
});

export const SidePanelList = () => {
    state = {
        left: false
    }

    toggleDrawer = open => () => {
        this.setState({
            left: open
        })
    }

    render(){


        const { left } = this.state
    }
    <div>

        <MenuIcon onClick={this.toggleDrawer(true)} />
        <Drawer open={left} onClose={this.toggleDrawer(false)} />
        <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>

            {/* to home */}
            <Link to='/' >
                <ListItem button>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
            </Link>

            {/* to profile */}
            <Link to={`/profile`}>
                <ListItem button>
                    <ListItemIcon><FaceIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
            </Link>

            {/* to friends */}
            <Link to='/friends'>
                <ListItem button>
                    <ListItemIcon><EmojiPeople /></ListItemIcon>
                    <ListItemText primary="friends" />
                </ListItem>
            </Link>
        </div>
    </div>


}