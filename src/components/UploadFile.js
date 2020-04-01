import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import fire from '../Fire';


const UploadFile = inject("MainStore", "InputStore")(observer((props) => {

    const [newImage, setImage] = useState('')
    const [url, setUrl] = useState('')
    const storage = fire.storage()


    const handleChange =  (e) => {
        const newImage = e.target.files[0]
        // console.log(e.target.files[0]);
        
        if (newImage) {
            // props.InputStore.handleInput(e.target.name, {newImage})
            setImage(newImage)
        }
        
    }
    const handleUpload = () => {
        console.log(newImage);
        
        const uploadTask = storage.ref(`images/${newImage.name}`).put(newImage)
        uploadTask.on('state_changed',
            (snapshot) => {

            }
            , (error) => {
                console.log(error);

            }, () => {
                storage.ref(`images`).child(newImage.name).getDownloadURL().then(url => {
                    console.log(url);
                    props.InputStore.handleInput('image', url)
                })
            })
    }

    return (
        <div>

            <input type="file" onChange={handleChange}  name='newImage' />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}))

export default UploadFile