import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import AddHour from './addHour';
import AdressInput from '../Map'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import UploadFile from '../UploadFile';
import UploadIcon from '../UploadIcons'

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


const hoursArr = [
    {value: "08:00-09:00", label: "08:00-09:00"},
    {value: "09:00-10:00", label: "09:00-10:00"},
    {value: "10:00-11:00", label: "10:00-11:00"},
    {value: "11:00-12:00", label: "11:00-12:00"},
    {value: "12:00-13:00", label: "12:00-13:00"},
    {value: "13:00-14:00", label: "13:00-14:00"},
    {value: "14:00-15:00", label: "14:00-15:00"},
    {value: "15:00-16:00", label: "15:00-16:00"},
    {value: "16:00-17:00", label: "16:00-17:00"},
    {value: "17:00-18:00", label: "17:00-18:00"},
    {value: "18:00-19:00", label: "18:00-19:00"},
    {value: "19:00-20:00", label: "19:00-20:00"},
    {value: "20:00-21:00", label: "20:00-21:00"},
    {value: "21:00-22:00", label: "21:00-22:00"},
    {value: "22:00-23:00", label: "22:00-23:00"},
    {value: "23:00-00:00", label: "23:00-00:00"}
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    adresInp: {
        width: '100%',
        margin: theme.spacing(3),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
  }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}


  



const EditUser = inject("MainStore", "InputStore")(observer((props) => { 


    const classes = useStyles();
    const theme = useTheme();

    const [firstName, setFirstName] = useState(props.MainStore.curUser.firstName)
    const [lastName, setLastName] = useState(props.MainStore.curUser.lastName)
    const [birthDate, setbirthDate] = useState(props.MainStore.curUser.birthDate)
    const [phoneNum, setPhoneNum] = useState(props.MainStore.curUser.phoneNum)
    const [address, setAddress] = useState(props.MainStore.curUser.address)
    const [gender , setGender] = useState(props.MainStore.curUser.gender)
    const [smoker, setSmoker] = useState(props.MainStore.curUser.smoker)    
    const [hours, setHours] = useState(props.MainStore.curUser.hours)

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

    const handleChange = (event) => {
        setHours(event.target.value);
      };
    
    return (
      <FormGroup>

        <Grid container marginBottom={5} spacing={2}>
          
          <Grid item xs={12} sm={6}>
            <TextField
            id="firstName"
            name="firstName"
            variant="outlined"
            helperText="Enter First Name"
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
              helperText="Enter Last Name"
              required
              fullWidth
              label="Last Name"
              autoFocus
              value={lastName}
              onChange={inputHandler} 
            />
          </Grid>

          <Grid item xs={12} >
            <TextField
              id="phoneNum"
              value={phoneNum} 
              name="phoneNum" 
              onChange={inputHandler}
              helperText="Enter Phone number"
              variant="outlined"
              // required
              fullWidth
              label="Phone Number"
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-gender"
              select
              label="Gender"
              value={gender}
              onChange={inputHandler}
              helperText="Select your gender"
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
              value={birthDate}
              className={classes.textField}
              name="birthDate" 
              onChange={inputHandler}
              InputLabelProps={{
                shrink: true,
              }}
            /> 
          </Grid>

          {/* <Grid item xs={12}>
            <UploadFile imagesInputName='userImages' />
          </Grid> */}
            
          <Grid className={classes.adresInp} item xs={12}>
            <AdressInput call={'address'} input={props.MainStore.userAddress}/>
          </Grid>
          
          <Grid item xs={12}>
              <FormControlLabel
                  control={<Checkbox value={smoker} checked={smoker} name="smoker" onChange={inputHandler} color="primary" />}
                  label="Are you a smoker?"
              />
          </Grid>
          
          <Grid item xs={12}> 
            <FormControl className={classes.formControl}>
                <InputLabel id="outlined-label">Favorite hours</InputLabel>
                <Select
                    labelId="outlined-label"
                    id="outlined"
                    multiple
                    value={hours}
                    onChange={handleChange}
                    name={"hours"}
                    input={<Input id="select-multiple-hours" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {hoursArr.map((option) => (
                        <MenuItem key={option.value} value={option.value} style={getStyles(option.value, option.value, theme)}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

          </Grid>

        </Grid>
      </FormGroup>

    )
}))

export default EditUser

{/* <FormControl className={classes.formControl}>
        <InputLabel id="outlined-label">Favorite hours</InputLabel>
        <Select
          labelId="outlined-label"
          id="outlined"
          multiple
          value={hours}
          onChange={inputHandler}
          name={"hours"}
          input={<Input id="select-multiple-hours" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {hoursArr.map((option) => (
            // <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            //   {name}
            // </MenuItem>
            <MenuItem key={option.value} value={option.value} style={getStyles(name, personName, theme)}>
            {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
