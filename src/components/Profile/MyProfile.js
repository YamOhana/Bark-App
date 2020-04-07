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
import Grid from '@material-ui/core/Grid';
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
import CollectionsIcon from '@material-ui/icons/Collections';
const opencage = require('opencage-api-client');

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



const MyProfile = inject("MainStore", "InputStore")(observer((props) => {
    
    const classes = useStyles();
    const [edditing , setEdditing] = useState(true)
    const [editPic , setEditpic] = useState(true)
    // const [savePic , setSavepic] = useState(true)

    const updateInputs = () => {
        props.InputStore.handleInput("firstName", props.MainStore.curUser.firstName)
        props.InputStore.handleInput("lastName", props.MainStore.curUser.lastName)
        props.InputStore.handleInput("birthDate", props.MainStore.curUser.birthDate)
        props.InputStore.handleInput("phoneNum", props.MainStore.curUser.phoneNum)
        props.InputStore.handleInput("address", props.MainStore.curUser.address)
        props.InputStore.handleInput("gender", props.MainStore.curUser.gender)
        props.InputStore.handleInput("smoker", props.MainStore.curUser.smoker)
        props.InputStore.handleInput("hours", props.MainStore.curUser.hours)
        props.InputStore.handleInput("hours", props.MainStore.curUser.hours)
        props.InputStore.handleInput("userImages", props.MainStore.curUser.images)
    }

    const getCoordinates = async (stringAddress) => {
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

    const checkField = async field => {
        const u = props.MainStore.curUser
        if (props.InputStore[field] == undefined) {
            let val = ""
            switch (field) {
                case "firstName":
                    val = await prompt(`You forgot to fill your First Name`)
                    u.firstName = val
                    return val
                case "lastName":
                    val = await prompt(`You forgot to fill your Last Name`)
                    u.lastName = val
                    return val
                case "address":
                    val = await prompt(`You forgot to put your Address`)
                    u.address = val
                    return val
                case "smoker":
                    u.smoker = false
                    return false
                case "hours":
                    console.log(`hours false`)
                    u.hours = []
                    return []
                default:
                    u[field] = null
                    return null
            }
        }
        u[field] = props.InputStore[field]
        return props.InputStore[field]
    };

    const uploadPic = () => {
        console.log(`uploadPic`);
        setEditpic(!editPic)
        
    }

    const editProfile = async () => {
        await updateInputs()
        setEdditing(!edditing)
        if(!editPic) {setEditpic(!editPic)}
    }
    const savePicture = async () => {
        setEditpic(!editPic)
        await saveUserChanges()
    }

    const saveUserChanges = async () => {
        const updatedUser = {
            firstName: await checkField('firstName'),
            lastName: await checkField('lastName'),
            birthDate: await checkField('birthDate'),
            phoneNum: await checkField('phoneNum'),
            address: await checkField('address'),
            homeCoord: await getCoordinates(await checkField('address')),
            gender: await checkField('gender'),
            smoker: await checkField('smoker'),
            hours: await checkField('hours'),
            images: props.InputStore.userImages
        }
        axios.put(`http://localhost:3001/user/${props.MainStore.curUser.id}`, updatedUser).then(res => {
               
            })
        setEdditing(!edditing)
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
                props.MainStore.curUser ? (props.MainStore.curUser.images ? 
                    <CardMedia
                        className={classes.media}
                        image={props.MainStore.curUser.images[0]}
                        title={props.MainStore.curUser.images[0]}
                    />
                 :
                (<CardMedia
                        className={classes.media}
                        image={props.MainStore.curUser.image}
                        title={props.MainStore.curUser.image}
                    />)
                    )
                    : null
            }

            {!edditing ?
            
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={uploadPic}
                className={classes.button}
                startIcon={<EditIcon />} 
            >
                Edit pic
            </Button> :
            null
            }
            {!editPic ?
            <Grid item xs={12}>
                <UploadFile imagesInputName='userImages' />
            </Grid> :
            null
            }

            {edditing ?
            null :
            
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={savePicture}
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

            <EditUser 
                firstName={props.InputStore.firstName}
                lastName={props.InputStore.lastName}
                birthDate={props.InputStore.birthDate}
                phoneNum={props.InputStore.phoneNum}
                address={props.InputStore.address}
                gender={props.InputStore.gender}
                smoker={props.InputStore.smoker}
                hours={props.InputStore.hours}
            /> 
            }
            
            
        </Card>


    )
}))


export default MyProfile




