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
import Friends from '@material-ui/icons/PersonAdd'
import Maps from '@material-ui/icons/Map'
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
    <Link to='/Friends'>
      <ListItem button>
        <ListItemIcon>
          <Friends />
        </ListItemIcon>
        <ListItemText primary="Friends" />
      </ListItem>
    </Link>
    <Link to='/Maps'>
      <ListItem button>
        <ListItemIcon>
          <Maps />
        </ListItemIcon>
        <ListItemText primary="Maps" />
      </ListItem>
    </Link>
  </div>
);
}



export const OtherFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>

    <ListItem button >
      <ListItemIcon>
        <ExitToAppIcon/>
      </ListItemIcon>
      <ListItemText primary='Log-Out' />
    </ListItem>
  </div>
);

FolderListItems.propTypes = {
  user: PropTypes.object.isRequired
};