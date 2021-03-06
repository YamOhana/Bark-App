import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
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
import Popover from '@material-ui/core/Popover';
import OtherProfile from '../Profile/OtherProfile';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MapContainer from '../Maps'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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
    }
}));



const Dog = inject("MainStore")(observer((props) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [imageNum, setImageNum] = React.useState(0);

    const [anchorE2, setAnchorE2] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorE2(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const open2 = Boolean(anchorE2);
    const id2 = open ? 'simple-popover' : undefined;


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addFriend = () => {
        props.MainStore.addFriend(props.o.id)
        axios.put(`http://localhost:3001/requestFriend/${props.MainStore.curUser.id}/${props.o.id}`)

    }

    const acceptFriend = () => {
        props.MainStore.acceptFriendship(props.o.id)
        axios.put(`http://localhost:3001/addFriend/${props.MainStore.curUser.id}/${props.o.id}`)
    }

    const previousImage = () => {
        if (imageNum > 0) setImageNum(imageNum - 1)
    }
    const nextImage = () => {
        if (props.d.images && (imageNum < props.d.images.length - 1)) setImageNum(imageNum + 1)
    }

    return (
        <div className='dog-container'>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <OtherProfile o={props.o} />
            </Popover>
            <Popover
                id={id2}
                open={open2}
                anchorE2={anchorE2}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                HELLO
            </Popover>
            <Card className='dog-card'>
                <CardHeader
                    avatar={
                        <Avatar aria-label="dog" className='user-avatar' src={props.o.images} onClick={handleClick} >
                            {props.d.dogName}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClick2}>
                            {props.o.onwalk ?
                                <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.green}  >
                                    W
                            </Avatar> :
                                <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange} >
                                    H
                            </Avatar>

                            }
                        </IconButton>
                    }
                    title={props.d.dogName}
                />

                <CardMedia
                    className={classes.media}

                    image={props.d.images ? props.d.images[imageNum] : props.d.image}

                    title={props.d.dogName}
                />

                <IconButton aria-label="previous" onClick={previousImage}>
                    <NavigateBeforeIcon />
                </IconButton>
                <IconButton aria-label="next" onClick={nextImage}>
                    <NavigateNextIcon />
                </IconButton>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.d.size} {props.d.size ? <br></br> : null}
                        {props.d.dogGender} {props.d.dogGender ? <br></br> : null}
                        {props.d.type}  {props.d.type ? <br></br> : null}
                        {(props.MainStore.getDistance(props.o) != -1 ? `I'm ${Math.round(props.MainStore.getDistance(props.o) * 100) / 100} km away` : null)}
                    </Typography>
                </CardContent >
                <CardActions disableSpacing>

                    {
                        props.MainStore.curUser ? (
                            props.MainStore.curUser.friends.includes(props.o.id) ?
                                (<IconButton aria-label="my friend">
                                    <FriendsIcon />
                                </IconButton>) : (
                                    props.MainStore.curUser.requests.includes(props.o.id) ?
                                        (<IconButton aria-label="accept friendship requested" onClick={acceptFriend}>
                                            <AcceptRequest />
                                        </IconButton>) : (
                                            props.o.requests.includes(props.MainStore.curUser.id) ?
                                                (<IconButton aria-label="friendship requested">
                                                    <FriendRequest />
                                                </IconButton>)
                                                :
                                                (<IconButton aria-label="add to favorites" onClick={addFriend}>
                                                    <FavoriteIcon />
                                                </IconButton>)
                                        )
                                )
                        ) :
                            (<IconButton aria-label="add to favorites" onClick={addFriend}>
                                <FavoriteIcon />
                            </IconButton>)

                    }

                    {/* <IconButton aria-label="add to favorites" onClick={addFriend}>
                        <FavoriteIcon />
                    </IconButton> */}

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

                            {props.d.vaccinated ? `I'm Vaccinated` : null} {props.d.vaccinated ? <br></br> : null}
                            {props.d.neutered ? `I'm Neutered` : null} {props.d.neutered ? <br></br> : null}
                            {props.d.shy ? `I'm Shy` : null} {props.d.shy ? <br></br> : null}
                            {props.d.energetic ? `I'm Energetic` : null} {props.d.energetic ? <br></br> : null}
                            {props.d.dominant ? `I'm Dominant` : null} {props.d.dominant ? <br></br> : null}
                         I'm {props.MainStore.calculateAge(`${props.d.dogBirthDate}`)[0] == 0 ? null : `${props.MainStore.calculateAge(`${props.d.dogBirthDate}`)[0]} Years and`}
                            {Number.isInteger(props.MainStore.calculateAge(`${props.d.dogBirthDate}`)[1]) ? ` ${props.MainStore.calculateAge(`${props.d.dogBirthDate}`)[1]} Months old` : `1 Year Old`}

                        </Typography>


                    </CardContent>
                </Collapse>
            </Card >


        </div >



    )
}))


export default Dog




