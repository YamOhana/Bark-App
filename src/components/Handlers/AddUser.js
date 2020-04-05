import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import AddHour from './addHour';
import AdressInput from '../Map'
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

const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },
  
];

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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: '100%',
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
      
        <Grid container marginBottom={5} spacing={2}>
        
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <UploadFile imagesInputName='userImages' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-gender"
              select
              label="Gender"
              value={gender}
              onChange={inputHandler}
              helperText="Please select your gender"
              variant="outlined"
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="birthDate"
              label="Birthday"
              type="date"
              // defaultValue="2017-05-24"
              value={birthDate}
              className={classes.textField}
              name="birthDate" 
              onChange={inputHandler}
              InputLabelProps={{
                shrink: true,
              }}
            /> 
          </Grid>
        
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNum"
              value={phoneNum} 
              name="phoneNum" 
              onChange={inputHandler}
              variant="outlined"
              required
              fullWidth
              label="Phone Number"
              autoFocus
            />
          </Grid>
            
          <Grid item xs={12} sm={6}>
            <AdressInput call={'address'} input={props.InputStore.address}/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControlLabel
                control={<Checkbox value={smoker} name="smoker" onChange={inputHandler} color="primary" />}
                label="Are you a smoker?"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}> 
            <AddHour />
          </Grid>

        </Grid>

    
    )
}))

export default AddUser


// <Grid item xs={12} sm={6}>
//     <TextField
//         autoComplete="fname"
//         name="firstName"
//         variant="outlined"
//         required
//         fullWidth
//         id="firstName"
//         label="First Name"
//         // autoFocus
//     />
// </Grid>

// <Grid item xs={12} sm={6}>
//     <TextField
//         variant="outlined"
//         required
//         fullWidth
//         id="lastName"
//         label="Last Name"
//         name="lastName"
//         autoComplete="lname"
//     />
// </Grid> 

{/* <label htmlFor="gender">Gender:</label>
            <select type="text" id="gender" value={gender} name="gender" onChange={inputHandler}>

                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <br></br> */}
            {/* <label htmlFor="birthDate">Date of Birth:</label>
              <input type="date" id="birthDate" value={birthDate} name="birthDate" onChange={inputHandler}></input>
              <br></br> */}

              {/* <label htmlFor="phoneNum">Phone Number:</label>
            <input type="text" id="phoneNum" value={phoneNum} name="phoneNum" onChange={inputHandler}></input>
            <br></br> */}
            {/* <label htmlFor="smoker">Smoking?</label>
            <input type="checkbox" id="smoker" value={smoker} name="smoker" onChange={inputHandler}></input>
            <br></br> */}
