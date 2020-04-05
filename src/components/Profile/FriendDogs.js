import React from 'react'
import { observer, inject } from 'mobx-react'
import Dog from '../Dogs/Dog';
import { makeStyles } from '@material-ui/core/styles';
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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Home from '@material-ui/icons/Home'
import DirectionsWalk from '@material-ui/icons/DirectionsWalk'
import Chat from '@material-ui/icons/Chat'
import Pets from '@material-ui/icons/Pets'
import Tooltip from '@material-ui/core/Tooltip';



const DogFriends = inject("MainStore")(observer((props) => {



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

    const classes = useStyles()



    // const friendlyDog = props.mainStore.curFriends.map(f => {
    //     return f.dogs.map(d => <Dog d={d} o={f} />)
    // })



    return (
        <div>

            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="dog" className='dog-avatar' src={props.d.images}>
                            {props.d.dogName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onHvr="send messege">
                            <Chat />
                        </IconButton>
                    }
                    title={props.d.dogName}
                    subheader={` The owener is ${props.o.firstName}`}
                />
                <CardContent>
                    <Pets />
                    {props.o.onwalk ?
                        <DirectionsWalk /> :
                        <Home />
                    }
                </CardContent>
            </Card>

            <br></br>
            <br></br>
        </div>
    )


}))


export default DogFriends