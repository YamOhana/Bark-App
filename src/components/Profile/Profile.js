import React, { Component, Profiler } from 'react'
// import AddDog from '../AddDog';
// import MyDogs from './MyDog'
// import { BrowserRout../Handlers/AddDogter, Route, Link, Redirect } from 'react-router-dom'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';


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

        <div>


            <Card className='ProfileComponent'>
                <CardHeader
                    avatar={
                        props.MainStore.curUser ?
                            props.MainStore.curUser.onwalk ?
                                <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.green} >
                                W
                            </Avatar> :
                            <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.red} >
                            H
                            </Avatar> :
                            null

                        
                    }

                    title={props.MainStore.curUser.firstName}
                />
                <CardMedia
                    className={classes.media}
                    image='https://vignette.wikia.nocookie.net/sanicsource/images/9/97/Doge.jpg/revision/latest?cb=20160112233015'
                    title={props.MainStore.curUser.firstName}{...props.MainStore.curUser.lastName}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <div>{props.MainStore.curUser.dogs.map(d => {
                            return <div>{d.dogName}<span>{d.park}</span></div>
                        })}</div>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </CardActions>
            </Card>


        </div>



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



