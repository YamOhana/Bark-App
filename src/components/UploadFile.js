import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import fire from '../Fire';


const UploadFile = inject("MainStore", "InputStore")(observer((props) => {

    const [newImage, setImage] = useState('')
    const [url, setUrl] = useState('')
    const [uploadProgress, setUploadProgress] = useState('')
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
                setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }
            , (error) => {
                console.log(error);

            }, () => {
                storage.ref(`images`).child(img.name).getDownloadURL().then(url => {
                    props.InputStore.handleArrayInput(props.imagesInputName, url)
                    setUrl(url)
                })
            })
    }

    // console.log(uploadProgress) && `${Math.floor(uploadProgress)} %`
    return (
        <div>

            <input type="file" onChange={handleChange} name='newImage' />
            {(uploadProgress < 100 && uploadProgress > 0) ? (<progress value={uploadProgress} max="100" />) : null}
            {/* <img src={url || null} alt="Upload Image" height="300" width="400"></img> */}

        </div>
    )
}))

export default UploadFile