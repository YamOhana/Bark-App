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
import axios from 'axios'



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
}));

const Dog = inject("MainStore")(observer((props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


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

    return (

        //    <div>
        //      <span>I'm {props.d.dogName},a {props.d.size} size {props.d.type} {props.d.dogGender} Dog</span>
        //    <span>I'm {props.d.vaccinated ? null : 'NOT!'} Vaccinated</span>
        //  <span>I'm {props.d.neutered ? null : 'NOT!'} Neutered</span>
        //<span>{props.d.shy ? 'Shy': null}</span>
        //<span>{props.d.energetic ? 'Dnergetic': null}</span>
        //<span>{props.d.dominant ? 'Dominant': null}</span>

        <div className='dog-container'>

            <Card className='dog-card'>
                <CardHeader
                    avatar={
                        <Avatar aria-label="dog" className='dog-avatar'>
                            R
    </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.d.dogName}
                />
                <CardMedia
                    className={classes.media}
                    image='https://vignette.wikia.nocookie.net/sanicsource/images/9/97/Doge.jpg/revision/latest?cb=20160112233015'
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


export default Dog




