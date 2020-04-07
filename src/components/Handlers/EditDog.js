import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import UploadFile from '../UploadFile';
import AdressInput from '../Map'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

const genders = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
];

const sizes = [
    {value: "small", label: 'Small'},
    {value: "medium", label: 'Medium'},
    {value: "large", label: 'Large'},
]

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
        margin: theme.spacing(3),
    },
    adresInp: {
        width: '100%',
        margin: theme.spacing(3),
    },
  }));


const EditDog = inject("MainStore", "InputStore")(observer((props) => { 

    const classes = useStyles();

    const [dogName, setDogName] = useState(props.InputStore.dogName)
    const [dogGender, setDogGender] = useState(props.InputStore.dogGender)
    const [park, setPark] = useState(props.InputStore.park)
    const [vaccinated, setVaccinated] = useState(props.InputStore.vaccinated)
    const [neutered, setNeutered] = useState(props.InputStore.neutered)
    const [image, setImage] = useState(props.InputStore.image)
    const [dogBirthDate , setBirthDate] = useState(props.InputStore.dogBirthDate)
    const [size, setSize] = useState(props.InputStore.size)
    const [type , setType] = useState(props.InputStore.type)
    const [shy , setShy] = useState(props.InputStore.shy)
    const [energetic , setEnergetic] = useState(props.InputStore.energetic)
    const [dominant , setDominant] = useState(props.InputStore.dominant)

    
    
    const inputHandler = (e) => {

        const inp = props.InputStore
        e.target.name === "dogName" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setDogName(e.target.value) :
        e.target.name === "dogGender" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setDogGender(e.target.value) :
        e.target.name === "park" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setPark(e.target.value) :
        e.target.name === "vaccinated" ?
        inp.handleInput(e.target.name, e.target.checked) &&
        setVaccinated(e.target.checked) :
        e.target.name === "neutered" ? 
        inp.handleInput(e.target.name, e.target.checked) &&
        setNeutered(e.target.checked) :
        e.target.name === "image" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setImage(e.target.value) :
        e.target.name === "dogBirthDate" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setBirthDate(e.target.value) :
        e.target.name === "size" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setSize(e.target.value) :
        e.target.name === "type" ?
        inp.handleInput(e.target.name, e.target.value) &&
        setType(e.target.value) :
        e.target.name === "shy" ?
        inp.handleInput(e.target.name, e.target.checked) &&
        setShy(e.target.checked) :
        e.target.name === "energetic" ?
        inp.handleInput(e.target.name, e.target.checked) &&
        setEnergetic(e.target.checked) :
        inp.handleInput(e.target.name, e.target.checked) &&
        setDominant(e.target.checked)  
    }
    
    return (
        <FormGroup>
        <Grid container marginBottom={5} spacing={2}>
            
            <Grid item xs={12} sm={6}>
                <TextField
                    id="dogName"
                    name="dogName"
                    variant="outlined"
                    helperText="Enter your Dog's name"
                    required
                    fullWidth
                    label="Dog's Name"
                    autoFocus
                    defaultValue={props.dogName}
                    onChange={inputHandler} 
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                id="outlined-select-size"
                select
                label="size"
                name="size"
                defaultValue={props.size}
                onChange={inputHandler}
                helperText="Please select your Dog's size"
                variant="outlined"
                >
                {sizes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                id="outlined-select-dogGender"
                select
                label="dogGender"
                name="dogGender"
                defaultValue={props.dogGender}
                onChange={inputHandler}
                helperText="Please select your Dog's gender"
                variant="outlined"
                >
                {   
                    genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>))
                }
                </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                id="dogBirthDate"
                label="Your Dog's Birthday"
                type="date"
                defaultValue={props.dogBirthDate}
                className={classes.textField}
                name="dogBirthDate" 
                onChange={inputHandler}
                InputLabelProps={{
                    shrink: true,
                }}
                /> 
            </Grid>

            <Grid className={classes.adresInp} item xs={12}>
                <AdressInput call={'park'} input={props.InputStore.park}/>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="type"
                    name="type"
                    variant="outlined"
                    required
                    fullWidth
                    label="Dog's Type"
                    autoFocus
                    defaultValue={props.type}
                    onChange={inputHandler} 
                />
            </Grid>

            <Grid item xs={12} >
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Your Dog's Data</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={props.vaccinated} name="vaccinated" onChange={inputHandler} color="primary" />}
                            label="Is your Dog vaccinated?"
                        />
                    
                        <FormControlLabel
                            control={<Checkbox defaultChecked={props.neutered} name="neutered" onChange={inputHandler} color="primary" />}
                            label="Is your Dog Neutered?"
                        />
                    </FormGroup> 

                <FormLabel component="legend">Your Dog's Nature</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                        control={<Checkbox defaultChecked={props.shy} onChange={inputHandler} name="shy" />}
                        label="Is your Dog Shy?"
                        />
                        <FormControlLabel
                        control={<Checkbox defaultChecked={props.energetic} onChange={inputHandler} name="energetic" />}
                        label="Is your Dog Energetic?"
                        />
                        <FormControlLabel
                        control={<Checkbox defaultChecked={props.dominant} onChange={inputHandler} name="dominant" />}
                        label="Is your Dog Dominant?"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>

        </Grid>
        </FormGroup> 

    
    )
}))

export default EditDog
