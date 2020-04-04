import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import AddHour from './addHour';
import AdressInput from '../Map'
import 'date-fns';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import UploadFile from '../UploadFile';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';




const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const AddUser = inject("MainStore", "InputStore")(observer((props) => { 


    const classes = useStyles();

    const [firstName, setFirstName] = useState(props.InputStore.firstName)
    const [lastName, setLastName] = useState(props.InputStore.lastName)
    const [birthDate, setbirthDate] = useState(props.InputStore.birthDate)
    const [phoneNum, setPhoneNum] = useState(props.InputStore.phoneNum)
    const [address, setAddress] = useState(props.InputStore.address)
    const [gender , setGender] = useState(props.InputStore.gender)
    const [smoker, setSmoker] = useState(props.InputStore.smoker)
    // const [hours , setHours] = useState(props.InputStore.hours)
 
    
    const inputHandler = (e) => {
        const inp = props.InputStore
        e.target.name === "firstName" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setFirstName(e.target.value) :
        e.target.name === "lastName" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setLastName(e.target.value) :
        e.target.name === "gender" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setGender(e.target.value) :
        e.target.name === "birthDate" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setbirthDate(e.target.value) :
        e.target.name === "phoneNum" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setPhoneNum(e.target.value) :
        e.target.name === "address" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setAddress(e.target.value) :
        inp.handleInput(e.target.name, e.target.checked) &&
        setSmoker(e.target.checked) 
        
    }
        
    return (
        <div className={classes.paper}>
<form className={classes.form} noValidate>

        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField
            id="firstName"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="First Name"
            autoFocus
            value={firstName}
            onChange={inputHandler} 
            />
            <br></br>

        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            id="lastName"
            name="lastName"
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            autoFocus
            value={lastName}
            onChange={inputHandler} 
            />
            <br></br>
        </Grid>

        <Grid item xs={12} sm={6}>

        <AdressInput
        variant="outlined"
        required
        fullWidth
        label="Address"
        autoFocus
       call={'address'} input={props.InputStore.address}/>
        {/* <label htmlFor="address">Address:</label>
        {/* <input type="text" id="address" value={address} name="address" onChange={inputHandler}></input> */}
        {/* <AdressInput call={'address'} input={props.InputStore.address}/> */} 

        <br></br>
        </Grid>

        <UploadFile imagesInputName='userImages' />

        <Grid>
        <label htmlFor="gender">Gender:</label>
        <select type="text" id="gender" value={gender} name="gender" onChange={inputHandler}>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        <br></br>
        </Grid>
     

        <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <Grid container justify="space-around">

      <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="dd/MM/yyyy"
      margin="normal"
      id="birthDate"
      label="Birthday"
      value={birthDate}
      onChange={inputHandler}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
      />
<br></br>
    </Grid>
      </MuiPickersUtilsProvider>

    {/* <label htmlFor="birthDate">Date of Birth:</label>
        <input type="date" id="birthDate" value={birthDate} name="birthDate" onChange={inputHandler}></input>
      <br></br> */}
    
        {/* <label htmlFor="birthDate">Date of Birth:</label>
        <input type="date" id="birthDate" value={birthDate} name="birthDate" onChange={inputHandler}></input>
        <br></br> */}

        <label htmlFor="phoneNum">Phone Number:</label>
        <input type="text" id="phoneNum" value={phoneNum} name="phoneNum" onChange={inputHandler}></input>
        <br></br>


        <label htmlFor="smoker">Smoking?</label>
        <input type="checkbox" id="smoker" value={smoker} name="smoker" onChange={inputHandler}></input>
        <br></br>

        <AddHour />
        
        </Grid>
</form>
    </div>
    )
}))

export default AddUser