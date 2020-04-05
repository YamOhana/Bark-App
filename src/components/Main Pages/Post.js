import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';


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
    }
}));

const useStylesComment = makeStyles((theme) => ({
    rooter: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

const Post = inject("MainStore", "InputStore")(observer((props) => {

    const classes = useStyles();
    const commentClasses = useStylesComment()

    const date = new Date(props.p.time)

    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

    return (
        <div className={commentClasses.rooter}>
            <Paper className={commentClasses.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar aria-label="dog" className='user-avatar' src={props.sender.images ? props.sender.images[0] : props.sender.images}>
                            {props.sender.firstName[0]}
                        </Avatar>

                        <Typography>{props.sender.firstName} {props.sender.lastName[0]}.</Typography>

                    </Grid>
                    <Grid item xs>
                        <Typography align="left">{props.p.comment}</Typography>
                        <br></br>
                        {(props.p.picture && props.p.picture!='') ? <CardMedia
                            className={classes.media}

                            image={props.p.picture}
                        /> : null}
                        <br></br>
                        {datesAreOnSameDay(date,new Date()) ? <Typography align="right">{date.getHours()}:{date.getMinutes()} </Typography> : <Typography align="right">{date.getDate()}.{date.getMonth()}.{date.getFullYear()} </Typography>}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )

}))

export default Post