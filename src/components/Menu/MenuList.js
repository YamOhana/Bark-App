import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DogFace from '@material-ui/icons/Pets'
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from 'react-router-dom';

export const FolderListItems = ({ user }) => (
  <div>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DogFace />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
  </div>
);

export const OtherFolderListItems = (
  <div>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
  </div>
);

FolderListItems.propTypes = {
  user: PropTypes.object.isRequired
};