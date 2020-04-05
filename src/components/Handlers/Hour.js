import React from 'react';
import { observer, inject } from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';



const Hour = inject("MainStore", "InputStore")(observer((props) => {

    const deleteTime = () => {
        props.delete(props.time)
    }

    return (
        <Grid>
            <Typography component="span" variant="h5">
                {props.time}
                <DeleteForeverOutlinedIcon onClick={deleteTime}/>
            </Typography>
        </Grid>
    )
 }))

export default Hour
