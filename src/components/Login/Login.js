import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
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
import Singup from './Singup';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logbtn: {
    margin: theme.spacing(3, 2, 3),
  }
}));

const Login = inject("MainStore")(observer((props) => { 
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signORlog, setSign] = useState(true)

    const handleChange = (e) => {
        e.target.name === "email" ?
        setEmail(e.target.value) :
        setPassword(e.target.value)
    }

    const login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    const signMeIn = () => {
        setSign(!signORlog)
    }

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign {signORlog ?  "in" : "up"}
                    </Typography>
                    {signORlog ?  
                    <form className={classes.form} noValidate>
                        
                        <TextField
                            variant="outlined"
                            helperText="Enter your email"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            type="email"
                            onChange={handleChange}
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            helperText="Enter Password"
                            required
                            fullWidth
                            value={password}
                            onChange={handleChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={login}
                        >
                            Sign In
                        </Button>

                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </form> :
                    <Singup />
                } 
                </div>
                {signORlog ?
                <Grid item>
                    <Button 
                        color="primary"
                        className={classes.logbtn}
                        onClick={signMeIn}>
                        Don't have an account? Sign Up
                    </Button>
                </Grid> :

                <Grid item>
                    <Button 
                        color="primary"
                        className={classes.logbtn}
                        onClick={signMeIn}>
                        Already have an account? Sign in
                    </Button>
                </Grid>
                }

                <Box mt={4}>
                <Copyright />
                </Box>
            </Container>
    
    );
    }))

export default Login