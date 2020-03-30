import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'



const Feed = inject("MainStore", "InputStore")(observer((props) => { 

    const [comment, setComment] = useState(props.InputStore.comment)

    const inputHandler = (e) => {
        props.InputStore.handleInput(e.target.name, e.target.value)
        setComment(e.target.value)
    }

    const addPost = () => {
        const post = {
            pid: props.MainStore.posts[0].uid + 1,
            comment: comment,
            senderId: props.MainStore.curUser.id
        }
        console.log(post)
        props.MainStore.addPost(post)
        setComment("")
    }

    return (
        <div>
            <div>Im feed</div>
            <label htmlFor="comment"><b>Add Post : </b></label>
            <input type="text" id="comment" value={comment} name="comment" onChange={inputHandler}></input>
            <button onClick={addPost}>POST</button>
            <br></br>
            <div>
                {props.MainStore.posts.map(p => {
                    // const sender = props.MainStore.owners.find(o => o.id === p.senderId).name
                    // console.log(sender)
                    return (
                    <div>
                        {/* <span>{sender.name}</span> */}
                        <span>{p.comment}</span>
                    </div>
                    )})}
            </div>
        </div>
    )

}))

export default Feed