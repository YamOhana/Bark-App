import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AddComment from '@material-ui/icons/AddCircleOutline'
import { makeStyles } from '@material-ui/core/styles';
import UploadFile from '../UploadFile';
import Post from './Post'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const Feed = inject("MainStore", "InputStore")(observer((props) => {

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
            <div className={classes.root} noValidate autoComplete='off'>
                <TextField id="comment" value={comment} name="comment" onChange={inputHandler} label="What's on your mind?" variant="outlined" />
                <UploadFile imagesInputName='commentPictures' />
                {props.InputStore.commentPictures.length ? <img src={props.InputStore.commentPictures || null} alt="Upload Image" height="300" width="400"></img> : null}

                <AddComment onClick={addPost} />
            </div>
            <br></br>
            <button onClick={() => {setMyFriendsOrAll(true);
            }}>My Friends</button>
            <button onClick={() => {setMyFriendsOrAll(false);
            }}>All</button>
            <div>
                {props.MainStore.posts.filter(p =>
                    ((p.senderId==props.MainStore.curUser.id)||(myFriendsOrAll ? props.MainStore.curUser.friends.includes(p.senderId) : true))
                ).map(p => {
                    const sender = props.MainStore.owners.find(o => o.id === p.senderId)
                    return (
                        <Post p={p} sender={sender} />
                    )
                })}
            </div>
        </div>
    )

}))

export default Feed