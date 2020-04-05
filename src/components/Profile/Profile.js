import React, { Component, Profiler } from 'react'
// import AddDog from '../AddDog';
// import MyDogs from './MyDog'
// import { BrowserRout../Handlers/AddDogter, Route, Link, Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import MyDog from './MyDog';
import MyProfile from './MyProfile';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    green: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: "#76ff03",
    }
}));

const Profile = inject("MainStore", "InputStore")(observer((props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    // const ownerId = this.props.Mainstore.currUser

    return (
        
            props.MainStore.curUser ? (

                <div>


                    <MyProfile />

                           <br></br>
                    <Typography>
                                My Dogs: 
                            </Typography>

                    <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <div>{props.MainStore.curUser.dogs.map(d => {
                                    return <MyDog d={d} o={props.MainStore.curUser} />
                                })}</div>
                            </Typography>
                        </CardContent>

                </div>
            )
                : <Redirect to='/' />
        


    )

}))




export default Profile;




    //  <div className="ProfileComponent">
    //     {console.log(props.MainStore.curUser)}
    //     <span>{props.MainStore.curUser.firstName }  </span>
    //     <span>{props.MainStore.curUser.lastName  }  </span>
    //     <div>{props.MainStore.curUser.dogs.map(d => {
    //         return <div>{d.dogName}<span>{d.park}</span></div>
    //     })}</div>

    // </div> 



