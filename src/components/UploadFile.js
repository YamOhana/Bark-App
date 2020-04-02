import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import fire from '../Fire';


const UploadFile = inject("MainStore", "InputStore")(observer((props) => {

    const [newImage, setImage] = useState('')
    const [url, setUrl] = useState('')
    const storage = fire.storage()


    const handleChange = (e) => {
        const newImage = e.target.files[0]
        
        if (newImage) {
            handleUpload(newImage)
            setImage(newImage)
        }
        
    }
    const handleUpload = img => {
        console.log(img);
        
        const uploadTask = storage.ref(`images/${img.name}`).put(img)
        uploadTask.on('state_changed',
            (snapshot) => {

            }
            , (error) => {
                console.log(error);

            }, () => {
                storage.ref(`images`).child(img.name).getDownloadURL().then(url => {
                    console.log(url);
                    props.InputStore.handleInput('image', url)
                })
            })
    }

    return (
        <div>

            <input type="file" onChange={handleChange}  name='newImage' />
            
        </div>
    )
}))

export default UploadFile