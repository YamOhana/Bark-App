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
import '../../styles/Login.css'
import { inject } from 'mobx-react'
const opencage = require('opencage-api-client');

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}


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
      marginBottom: theme.spacing(1)
      
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

  


@inject('InputStore')
class Singup extends Component {
    constructor(props) {
        super(props);
        // this.login = this.login.bind(this);
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

    // login(e) {
    //     e.preventDefault();
    //     fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={this.classes.paper}>
                    <Avatar className={this.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={this.classes.form} noValidate>
                        <Grid container spacing={2}>
                            
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
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

                            <Grid item xs={12}>
                                <AddUser />
                            </Grid>

                            <Grid item xs={12}>
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
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}
        </Container>
            
        );
    }
}
export default Singup;

// <div className="col-md-6">
//                 {/* <button onClick={() => { this.setState({ signOrLog: true }) }} className="chooseLog">Login</button>
//                 <button onClick={() => { this.setState({ signOrLog: false }) }} style={{ marginLeft: '25px' }} className="chooseSign">Signup</button> */}
                
//                 <div>

//                     <div className="form-group1">
//                         <label htmlFor="exampleInputEmail1">Email address</label>
//                         <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
//                         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                     </div>
//                     <div className="form-group2">
//                         <label htmlFor="exampleInputPassword1">Password</label>
//                         <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
//                     </div>
                    
//                     <div>
//                         <AddUser />
//                         <div><b>Dog details:</b></div>
//                         <AddDog />
//                         <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
//                     </div>
                    
//                 </div>

//             </div>


// export default function SignUp() {
  

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={this.classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 name="email"
//                 autoComplete="email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={this.handleChange}
//                 value={this.state.password}
//               />
//             </Grid>
//             <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="firstName"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 autoComplete="lname"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign Up
//           </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link href="#" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }

{/* <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container> */}