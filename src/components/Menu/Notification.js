import React from 'react';
import { observer } from 'mobx-react'
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const Notification = (observer((props) => {
    return (

        <Grid container>
            <Grid item xs={4} justify="flex-start">
                <Avatar aria-label="dog" className='user-avatar' src={props.user.images}>
                    {props.user.firstName[0]}
                </Avatar>
            </Grid>
            <Grid item xs={4}>
                <Avatar aria-label="dog" className='dog-avatar' src={props.user.dogs[0].images}>
                    {props.user.dogs[0].dogName[0]}
                </Avatar>
            </Grid>
            <Grid item xs={4} justify="flex-end">
                <button>Accept</button>
            </Grid>




        </Grid>
    )
}))


export default Notification




