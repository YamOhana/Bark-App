import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Home from '@material-ui/icons/Home'
import DirectionsWalk from '@material-ui/icons/DirectionsWalk'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';

const DogFriends = inject("MainStore")(observer((props) => {



    const useStyles2 = makeStyles((theme) => ({
        root2: {
          '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
          },
        },
      }));

      const classes2 = useStyles2();



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
        typography: {
            padding: theme.spacing(2)
        }

    }));

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [expanded, setExpanded] = React.useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const addMessage = () => {


        const message = {
            senderId: props.MainStore.curUser.id,
            time: new Date()
        }
        props.MainStore.addMessage(message)

        console.log(message);
        
        axios.post('http://localhost:3001/messages', message)
            .then(res => {
                console.log(`message sent`)
            })

    }
    



    return (
        <div>
            <List>

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

                    <form className={classes2.root2} noValidate autoComplete="off">
                       <TextField id="outlined-basic" label={`Send ${props.o.firstName} a quick message`} variant="outlined" onSubmit={'ddd'} >
                       </TextField>
                           <SendIcon  onClick={addMessage}/>
                    </form>
              
                </Popover>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="dog" className='dog-avatar' src={props.d.images} onClick={handleClick}>
                                {props.d.dogName[0]}


                            </Avatar>
                        }
                        action={
                            
                            <IconButton>

                                {props.o.onwalk ?
                                    <DirectionsWalk></DirectionsWalk> :
                                    <Home></Home>
                                }

                            </IconButton>
                            

                        }
                        title={props.d.dogName}
                        subheader={` ${props.o.firstName}'s dog`}
 
                    />
                 
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
                        <Typography paragraph>In case you forgot who I am...</Typography>
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
            </List>
            <br></br>
        </div>
    )
    
    
}))


export default DogFriends



  