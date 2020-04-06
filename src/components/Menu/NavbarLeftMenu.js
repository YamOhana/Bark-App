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
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Grid from '@material-ui/core/Grid';

import { observer, inject } from 'mobx-react'

import { FolderListItems } from './MenuList';
import { Popover } from '@material-ui/core';
import Notifications from './Notifications';




const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  toolbar: theme.mixins.toolbar
});

@inject('MainStore')
@observer
class NavbarLeftMenu extends React.Component {
  state = {
    left: false,
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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



    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {this.props.MainStore.curUser ?
            <Notifications requestsIds={this.props.MainStore.curUser.requests.filter(e => !this.props.MainStore.curUser.friends.includes(e))} />
            : null
          }
        </Popover>

        <Grid container>
          <Grid item xs={1} justify="flex-start">
            <MenuIcon onClick={this.toggleDrawer(true)} />
          </Grid>
          <Grid item xs={10}>
          </Grid>
          <Grid item xs={1} justify="flex-end">

            {
              this.props.MainStore.curUser ? (
                this.props.MainStore.curUser.requests.every(e => this.props.MainStore.curUser.friends.includes(e)) ?
                  <NotificationsOffIcon />
                  :
                  <NotificationsActiveIcon onClick={this.handleClick} />

              )
                :

                <NotificationsOffIcon />

            }

          </Grid>
        </Grid>
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