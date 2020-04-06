import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import fire from '../Fire';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const UploadFile = inject("MainStore", "InputStore")(observer((props) => {

    const [newImage, setImage] = useState('')
    const [url, setUrl] = useState('')
    const [uploadProgress, setUploadProgress] = useState('')
    const [completed, setCompleted] = useState(0);
    const [buffer, setBuffer] = useState(10);
    
    const classes = useStyles();
    const storage = fire.storage()

    const handleChange = (e) => {
        const newImage = e.target.files[0]

        if (newImage) {
            handleUpload(newImage)
            setImage(newImage)
        }

    }

    const progress = React.useRef(() => {});
    React.useEffect(() => {
        progress.current = () => {
        if (completed > 100) {
            setCompleted(0);
            setBuffer(10);
        } else {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setCompleted(completed + diff);
            setBuffer(completed + diff + diff2);
        }
        };
    });

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

    return (
        <Grid item xs={12} className={classes.root}>
            <TextField type="file" id="filled-basic" value={newImage} onChange={handleChange} name='newImage' variant="filled" /> 
            {(uploadProgress < 100 && uploadProgress > 0) ? (<LinearProgress variant="buffer" value={uploadProgress} valueBuffer={buffer} color="secondary" />) : null}

        </Grid>
    
    )
}))

export default UploadFile

  // <div>

        //     <input type="file" onChange={handleChange} name='newImage' />
        //     {(uploadProgress < 100 && uploadProgress > 0) ? (<progress value={uploadProgress} max="100" />) : null}
        //     {/* <img src={url || null} alt="Upload Image" height="300" width="400"></img> */}

        // </div> 