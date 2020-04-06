import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { deepOrange } from '@material-ui/core/colors';
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import UploadFile from '../UploadFile';
import EditUser from '../Handlers/EditUser'

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
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    green: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: "#76ff03",
    },
    button: {
        margin: theme.spacing(1),
    },
}));



const MyProfile = inject("MainStore")(observer((props) => {
    const classes = useStyles();
    const [edditing , setEdditing] = useState(true)
    
    const editProfile = () => {
        setEdditing(false)
    }
    
    return (

        <Card className='ProfileComponent'>
            <CardHeader
                avatar={

                    props.MainStore.curUser.onwalk ?
                        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.green} >
                            W
                        </Avatar> :
                        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange} >
                            H
                        </Avatar>

                }

                title={`${props.MainStore.curUser.firstName} ${props.MainStore.curUser.lastName}`}
                action={
                    <CardActions  disableSpacing>
                        <IconButton onClick={editProfile} aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                }
            />
            
            {
                props.MainStore.curUser ? (props.MainStore.curUser.images ? (props.MainStore.curUser.images.map(i =>
                    <CardMedia
                        className={classes.media}
                        image={i}
                        title={i}
                    />
                )) :
                (<CardMedia
                        className={classes.media}
                        image={props.MainStore.curUser.image}
                        title={props.MainStore.curUser.image}
                    />)
                    )
                    : null
            }
            
            {edditing ?
            null :
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save Changes
            </Button>  
            }

            { edditing ?
            <Typography>
                Address: {props.MainStore.curUser.address}
                <br></br>
                Date of Birth: {props.MainStore.curUser.birthDate}
                <br></br>
                Email:  {props.MainStore.curUser.email}
                <br></br>
                Gender: {props.MainStore.curUser.gender}
                <br></br>
                Hours: {props.MainStore.curUser.hours.map(h => h)}
                <br></br>
                Phone Number: {props.MainStore.curUser.phoneNum}
                <br></br>
                {props.MainStore.curUser.smoker ? "I'm a Smoker" : null}
            </Typography> :

            <EditUser /> 
            }
            
            
        </Card>


    )
}))


export default MyProfile




