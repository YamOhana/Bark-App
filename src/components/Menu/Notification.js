import React from 'react';
import { observer, inject } from 'mobx-react'
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Friends from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'


const Notification =  inject("MainStore")(observer((props) => {

    const acceptFriend = () => {
        props.MainStore.acceptFriendship(props.user.id)
        axios.put(`http://localhost:3001/addFriend/${props.MainStore.curUser.id}/${props.user.id}`)
    }

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
                <IconButton aria-label="accept friendship" onClick={acceptFriend}>
                    <Friends />
                </IconButton>

            </Grid>




        </Grid>
    )
}))


export default Notification




