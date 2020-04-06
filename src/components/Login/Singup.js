import React, { Component } from 'react';
import fire from '../../Fire';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddUser from '../Handlers/AddUser';
import AddDog from '../Handlers/AddDog';
import axios from 'axios';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../../styles/Login.css'
import { inject } from 'mobx-react'
import Divider from '@material-ui/core/Divider';
const opencage = require('opencage-api-client');

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
      margin: theme.spacing(3),
    //   marginBottom: theme.spacing(3)
    },
    formControl: {
        margin: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    logbtn: {
        margin: theme.spacing(3, 2, 3),
    }
}));

  


@inject('InputStore')
class Singup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    signIn() {
        this.props.signOut()
    }

    checkField(field) {
        if (this.props.InputStore[field] == undefined) {
            let val = ""
            switch (field) {
                case "firstName":
                    val = prompt(`You forgot to fill your First Name`)
                    return val
                case "lastName":
                    val = prompt(`You forgot to fill your Last Name`)
                    return val
                case "dogName":
                    val = prompt(`You forgot to fill your Dog's Name`)
                    return val
                case "dogImages":
                    val = prompt(`You forgot to put your Dog's image`)
                    return val
                case "userImages":
                    val = prompt(`You forgot to put your image`)
                    return val
                case "address":
                    val = prompt(`You forgot to put your Address`)
                    return val
                case "smoker":
                    return false
                case "hours":
                    console.log(`hours false`)
                    return []
                case "vaccinated":
                    return false
                case "neutered":
                    return false
                case "shy":
                    return false
                case "energetic":
                    return false
                case "dominant":
                    return false
                default:
                    return null
            }
        }
        return this.props.InputStore[field]
    };

    async getCoordinates(stringAddress) {
        console.log(stringAddress)
        try {
            const location = await opencage.geocode({q: stringAddress, key: '566a660cd08e4cdabc79d2abc4369dd6'})
            if (location.status.code == 200) {
                if (location.results.length > 0) {
                    const place = location.results[0];
                    console.log(place.formatted);
                    console.log(place.geometry);
                    return place.geometry
                }
            } else if (location.status.code == 402) {
                console.log('hit free-trial daily limit');
                return null
            } else {
                console.log('error', location.status.message);
                return null
            }
            
        } catch (error) {
            console.log('error', error.message);
            return null
        }

    } 

    

    signup(e) {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(async (u) => {
            
            
            let newUser = {
                userId: u.user.uid,
                email: this.state.email,
                firstName: this.checkField('firstName'),
                lastName: this.checkField('lastName'),
                birthDate: this.checkField('birthDate'),
                phoneNum: this.checkField('phoneNum'),
                address: this.checkField('address'),
                homeCoord: await this.getCoordinates(this.checkField('address')),
                gender: this.checkField('gender'),
                smoker: this.checkField('smoker'),
                hours: this.checkField('hours'),
                images: this.checkField('userImages'),
                dog: {
                    dogName: this.checkField('dogName'),
                    dogGender: this.checkField('dogGender'),
                    park: this.checkField('park'),
                    parkCoord: await this.getCoordinates(this.checkField('park')),
                    vaccinated: this.checkField('vaccinated'),
                    neutered: this.checkField('neutered'),
                    images: this.checkField('dogImages'),
                    dogBirthDate: this.checkField('dogBirthDate'),
                    size: this.checkField('size'),
                    type: this.checkField('type'),
                    shy: this.checkField('shy'),
                    energetic: this.checkField('energetic'),
                    dominant: this.checkField('dominant')
                }
            }


            axios.post('http://localhost:3001/user', newUser).then(res => {
                // this.props.clients.updateList(res.data)
            })


        })
            .catch((error) => {
                console.log(error);
            })
    }

    classes(){
        return useStyles();
    } 

    render() {
        return (

           
                    <form className={this.classes.form} noValidate>
                    <Grid container spacing={2}>
                        
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    helperText="Enter Email"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    helperText="Enter Password"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                            </Grid>
                            
                            <Grid container item xs={12}>
                                    <AddUser />
                            </Grid>

                            <Grid container item xs={12}>
                                <Typography component="span" variant="h5">
                                    Dog Details:
                                </Typography>

                                <AddDog />
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                        >
                            Sign Up
                        </Button>
                    
                    </form>
             
           
        );
    }
}
export default Singup;
