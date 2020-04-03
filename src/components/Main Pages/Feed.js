import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AddComment from '@material-ui/icons/AddCircleOutline'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import UploadFile from '../UploadFile';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
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


const Feed = inject("MainStore", "InputStore")(observer((props) => {

    const commentClasses = useStylesComment()
    const classes = useStyles();
    const [comment, setComment] = useState(props.InputStore.comment)

    
    const [myFriendsOrAll, setMyFriendsOrAll] = useState(true);

    const inputHandler = (e) => {
        props.InputStore.handleInput(e.target.name, e.target.value)
        setComment(e.target.value)
    }

    const addPost = () => {


        const post = {
            picture:props.InputStore.commentPictures,
            comment: comment,
            senderId: props.MainStore.curUser.id,
            time: new Date()
        }
        props.MainStore.addPost(post)

        console.log(post);
        
        axios.post('http://localhost:3001/post', post)
            .then(res => {
                console.log(`post sent`)
            })

        setComment("")
        props.InputStore.handleInput('commentPictures',[])
        props.InputStore.handleInput('comment','')

    }

    return (
        <div>
            <label htmlFor="comment"><b>Add Post : </b></label>
            <form className={classes.root} noValidate autoComplete='off'>
                <TextField id="comment" value={comment} name="comment" onChange={inputHandler} label="What's on your mind?" variant="outlined" />
                <UploadFile imagesInputName='commentPictures' />
                {props.InputStore.commentPictures.length ? <img src={props.InputStore.commentPictures || null} alt="Upload Image" height="300" width="400"></img> : null}

                <AddComment onClick={addPost} />
            </form>
            <br></br>
            <button onClick={() => {setMyFriendsOrAll(true);
            }}>My Friends</button>
            <button onClick={() => {setMyFriendsOrAll(false);
            }}>All</button>
            <div>
                {props.MainStore.posts.filter(p =>
                    (myFriendsOrAll ? props.MainStore.curUser.friends.includes(p.senderId) : true)
                ).map(p => {
                    const sender = props.MainStore.owners.find(o => o.id === p.senderId)
                    return (

                        <div>

                            {/* <div className={commentClasses.rooter}>
                            <Paper className={commentClasses.paper}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar>W</Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography>{p.time}</Typography>
                                        <Typography>{sender.firstName}</Typography>
                                        <Typography>{p.comment}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div> */}


                            <span>{p.comment}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}))

export default Feed