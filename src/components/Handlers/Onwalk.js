import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { lightGreen } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Walk from './Walk'

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "10vh",
    bottom: 0,
    position: "fixed",
    // backgroundColor: lightGreen["A400"]
    boxShadow: "0 0 2px 2px grey" 
  },
});  


export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("onwalk");

  return (
    <BottomNavigation
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid color="" item>At Home</Grid>
                <Grid item>
                  <Walk />
                </Grid>
              <Grid item>On Walk</Grid>
            </Grid>
          </Typography>
        </FormGroup>
      </FormControl>
        
      
    </BottomNavigation>
  );
}
