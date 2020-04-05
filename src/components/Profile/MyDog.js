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



const MyDog = inject("MainStore")(observer((props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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




