import React from 'react'
import { observer, inject } from 'mobx-react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';


const MainChat = inject("MainStore")(observer((props) => {

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

    const ContactUser = (c) => {

        props.MainStore.addChat(c.target.name)
    }

    return (

        <div>
            <Card className={classes.root} onClick={ContactUser}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="dog" className='dog-avatar' src={props.d.images}>
                            {props.d.dogName[0]}
                        </Avatar>
                    }
                   
                    title={props.d.dogName}
            
                />
            </Card>
        </div>
    )

}))


export default MainChat