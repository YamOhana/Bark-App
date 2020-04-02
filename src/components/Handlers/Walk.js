import React from 'react';
import { observer, inject } from 'mobx-react'
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import axios from 'axios'


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
  const [onwalk, setOnWalk] = React.useState(props.InputStore.onwalk);

  const handleChange = async () => {
    props.InputStore.handleInput("onwalk", !onwalk)
    props.MainStore.goOnWalk(!onwalk)
    await axios.put(`http://localhost:3001/walk/${props.MainStore.curUser.id}`, {data: !onwalk})
    setOnWalk(!onwalk)
  }


  return (
    <div>
      {
        props.MainStore.curUser ?
        <GreenSwitch checked={props.MainStore.isOnWalk} onChange={handleChange} name="onwalk" /> :
        null
      }
    </div>
  );
}))

export default Walk
