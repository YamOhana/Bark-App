import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'



const PersonalChat = inject("MainStore", "InputStore")(observer((props) => {


    const date = new Date(props.p.time)

    const inputHandler = (e) => {
        props.InputStore.handleInput(e.target.name, e.target.value)
        setComment(e.target.value)
    }




    const addPost = () => {


        const chat = {
            comment: comment,
            user1Id: props.MainStore.curUser.id,
            user2Id: props.MainStore.target.id,
            time: new Date()
        }
        props.MainStore.addChat(chat)

        console.log(chat);

        axios.post(`http://localhost:3001/chat`, chat)
            .then(res => {
                console.log(`chat created`)
            })

        setMessage("")
        props.InputStore.handleInput('message', '')

    }

    return (


        <div>

            hello world
        </div>
    )

}))



export default PersonalChat



