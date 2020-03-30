import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DogFace from '@material-ui/icons/Pets'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from 'react-router-dom';
import { FolderListItems } from './MenuList';




const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  toolbar: theme.mixins.toolbar
});

class NavbarLeftMenu extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
  };

  logout = () => {
    console.log(`trying to logout`)
    this.props.logout()
    console.log(`loged out`)
  }

  OtherFolderListItems = () => {

    return (
      <div>
          
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        
          <ListItem button onClick={this.logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Log-Out' />
          </ListItem>
        
      </div>
    )
  }

  render() {
    const { classes, user } = this.props;
    const { left } = this.state;

    const sideList = (
      <div className={classes.list}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <FolderListItems user={user} />
        </List>
        <Divider />
        <List>{this.OtherFolderListItems()}</List>
      </div>
    );

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer(true)} />
        <Drawer open={left} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

NavbarLeftMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(NavbarLeftMenu);