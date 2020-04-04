import React, { Component } from 'react';
import fire from '../Fire';
import AddUser from './Handlers/AddUser';
import AddDog from './Handlers/AddDog';
import axios from 'axios';
import '../styles/Login.css'
import { inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));





@inject('InputStore')
class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: '',
            signOrLog: true
        };
    }



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
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
            const location = await opencage.geocode({ q: stringAddress, key: '566a660cd08e4cdabc79d2abc4369dd6' })
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




    useStyles = makeStyles((theme) => ({
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



    render() {

        return (

            <div className="col-md-6">
                <button onClick={() => { this.setState({ signOrLog: true }) }} className="chooseLog">Login</button>
                <button onClick={() => { this.setState({ signOrLog: false }) }} style={{ marginLeft: '25px' }} className="chooseSign">Signup</button>
                <div>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="exampleInputEmail1"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                label="Email"
                                autoFocus
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <br></br>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="exampleInputPassword1"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                autoFocus
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <br></br>

                        </Grid>


                    </Grid>
                    {/* <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div> */}
                    {/* <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div> */}
                    {this.state.signOrLog ? <button type="submit" onClick={this.login} className="btn btn-primary">Send</button> :
                        <div>
                            <AddUser />
                            <div><b>Dog details:</b></div>
                            <AddDog />
                            <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                        </div>
                    }
                </div>

            </div>

        );
    }
}
export default Login;