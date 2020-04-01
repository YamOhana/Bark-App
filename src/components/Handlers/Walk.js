import React from 'react';
import { observer, inject } from 'mobx-react'
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100vw",
//     bottom: 0,
//     position: "fixed",
//   },
//   green: {
//     color: lightGreen["A400"]
//     ,
//     // backgroundColor: "#76ff03",
// }
// }))
const GreenSwitch = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: lightGreen["A400"],
    },
    '&$checked + $track': {
      backgroundColor: lightGreen["A400"],
    },
  },
  checked: {},
  track: {},
})(Switch);

       


const Walk = inject("MainStore", "InputStore")(observer((props) => {
  // const classes = useStyles()
  const [onwalk, setOnWalk] = React.useState(props.InputStore.onwalk);

  const handleChange = () => {
    console.log(!onwalk)
    props.InputStore.handleInput(!onwalk)
    props.MainStore.goOnWalk(!onwalk)
    setOnWalk(!onwalk)
  };

  return (
    <div>
      <GreenSwitch checked={onwalk} onChange={handleChange} name="onwalk" />
    </div>
  );
}))

export default Walk
