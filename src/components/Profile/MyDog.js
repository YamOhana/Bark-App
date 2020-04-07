import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FriendRequest from '@material-ui/icons/StarOutlined';
import AcceptRequest from '@material-ui/icons/NotificationsActive';
import FriendsIcon from '@material-ui/icons/CheckCircle';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deepOrange } from '@material-ui/core/colors';
import axios from 'axios'
import EditDog from '../Handlers/EditDog'
import UploadFile from '../UploadFile';
import Grid from '@material-ui/core/Grid';
const opencage = require('opencage-api-client');


const imgURL = 'https://www.hsppr.org/sites/default/files/Donate-dog_0.jpg'

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
    adresInp: {
        width: '100%',
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
}));



const MyDog = inject("MainStore", "InputStore")(observer((props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [edditing , setEdditing] = useState(true)
    const [editPic , setEditpic] = useState(true)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const loadInputs = () => {
        props.InputStore.handleInput('park', props.d.park)
        props.InputStore.handleInput('dogName', props.d.dogName)
        props.InputStore.handleInput('dogGender', props.d.dogGender)
        props.InputStore.handleInput('vaccinated', props.d.vaccinated)
        props.InputStore.handleInput('neutered', props.d.neutered)
        props.InputStore.handleInput('dogBirthDate', props.d.dogBirthDate)
        props.InputStore.handleInput('size', props.d.size)
        props.InputStore.handleInput('type', props.d.type)
        props.InputStore.handleInput('shy', props.d.park)
        props.InputStore.handleInput('energetic', props.d.energetic)
        props.InputStore.handleInput('dominant', props.d.dominant)
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
        const d = props.MainStore.curUser.dogs[props.i]
        if (props.InputStore[field] == undefined) {
            let val = ""
            switch (field) {
                case "dogName":
                    val = await prompt(`You forgot to fill your Dog's Name`)
                    d.dogName = val
                    return val
                case "vaccinated":
                    d.vaccinated = false
                    return false
                case "neutered":
                    d.neutered = false
                    return false
                case "shy":
                    d.shy = false
                    return false
                case "energetic":
                    d.energetic = false
                    return false
                case "dominant":
                    d.dominant = false
                    return false
                default:
                    d[field] = null
                    return null
            }
        }
        d[field] = props.InputStore[field]
        return props.InputStore[field]
    };

    

    const editDogProfile = async () => {
        await loadInputs()
        setEdditing(!edditing)
        if(!editPic) {setEditpic(!editPic)}
    }

    const uploadPic = () => {
        console.log(`uploadPic`);
        setEditpic(!editPic)
        
    }


    const savePicture = async () => {
        setEditpic(!editPic)
        await saveDogChanges()
    }

    const saveDogChanges = async () => {
        const updatedDog = {
            dogName: await checkField('dogName'),
            dogGender: await checkField('dogGender'),
            park: await checkField('park'),
            vaccinated: await checkField('vaccinated'),
            neutered: await checkField('neutered'),
            parkCoord: await getCoordinates(checkField('park')),
            dogBirthDate: await checkField('dogBirthDate'),
            size: await checkField('size'),
            type: await checkField('type'),
            images: props.d.images,
            shy: await checkField('shy'),
            energetic: await checkField('energetic'),
            dominant: await checkField('dominant'), 
        }
        const newDogs = props.MainStore.updateDog(props.i, updatedDog)
        console.log(newDogs);
        
        axios.put(`http://localhost:3001/dog/${props.MainStore.curUser.id}`, newDogs).then(res => {
            
            })
        setEdditing(!edditing)
    }
    

    return (     

        <div className='dog-container'>
            <Card className='dog-card'>
                <CardHeader
                    avatar={
                        <Avatar aria-label="dog" className='dog-avatar'>
                            {props.d.dogName[0]}
                        </Avatar>
                    }
                    title={props.d.dogName}
                    action={
                        <CardActions  disableSpacing>
                            <IconButton onClick={editDogProfile} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </CardActions>
                    }
                />

                <CardMedia
                    className={classes.media}
                    image={props.d.images ? props.d.images[0] : props.d.image}
                    title={props.d.dogName}
                />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.d.size}
                        <br></br>
                        {props.d.dogGender}
                        <br></br>
                        {props.d.type}
                    </Typography>
                </CardContent>
                
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
                {edditing ?
                null :
                <EditDog 
                    dogName={props.InputStore.dogName}
                    dogGender={props.InputStore.dogGender}
                    park={props.InputStore.park}
                    vaccinated={props.InputStore.vaccinated}
                    neutered={props.InputStore.neutered}
                    dogBirthDate={props.InputStore.dogBirthDate}
                    size={props.InputStore.size}
                    type={props.InputStore.type}
                    shy={props.InputStore.shy}
                    energetic={props.InputStore.energetic}
                    dominant={props.InputStore.dominant}
                />
                }
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>More Information:</Typography>
                        <Typography paragraph>


                            I'm {props.d.vaccinated ? null : 'NOT!'} Vaccinated <br></br>
                            I'm {props.d.neutered ? null : 'NOT!'} Neutered <br></br>
                            I'm {props.d.shy ? null : 'NOT!'} Shy <br></br>
                            I'm {props.d.energetic ? null : 'NOT!'} Energetic <br></br>
                            I'm {props.d.dominant ? null : 'NOT!'} Dominant <br></br>
                            I'm {props.MainStore.calculateAge(`${props.d.dogBirthDate}`)[0]} Years 
                            and {props.MainStore.calculateAge(`${props.d.dogBirthDate}`)[1]} Months old
                            



                        </Typography>


                    </CardContent>
                </Collapse>
            </Card>


        </div >



    )
}))


export default MyDog




