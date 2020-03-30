import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DogFace from '@material-ui/icons/Pets'
import HomeIcon from '@material-ui/icons/Home';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

// import fire from '../Fire';



export const FolderListItems = ({ user }) => {

  return (

  <div>
    <Link to='/'>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to='/Profile'>
      <ListItem button>
        <ListItemIcon>
          <DogFace />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link to='/Feed'>
      <ListItem button>
        <ListItemIcon>
          <DynamicFeedOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Feed" />
      </ListItem>
    </Link>
  </div>
);
}




FolderListItems.propTypes = {
  user: PropTypes.object.isRequired
};