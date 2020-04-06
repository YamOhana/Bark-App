import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import Hour from './Hour'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';


const hoursArr = [
    {value: "08:00-09:00", label: "08:00-09:00"},
    {value: "09:00-10:00", label: "09:00-10:00"},
    {value: "10:00-11:00", label: "10:00-11:00"},
    {value: "11:00-12:00", label: "11:00-12:00"},
    {value: "12:00-13:00", label: "12:00-13:00"},
    {value: "13:00-14:00", label: "13:00-14:00"},
    {value: "14:00-15:00", label: "14:00-15:00"},
    {value: "15:00-16:00", label: "15:00-16:00"},
    {value: "16:00-17:00", label: "16:00-17:00"},
    {value: "17:00-18:00", label: "17:00-18:00"},
    {value: "18:00-19:00", label: "18:00-19:00"},
    {value: "19:00-20:00", label: "19:00-20:00"},
    {value: "20:00-21:00", label: "20:00-21:00"},
    {value: "21:00-22:00", label: "21:00-22:00"},
    {value: "22:00-23:00", label: "22:00-23:00"},
    {value: "23:00-00:00", label: "23:00-00:00"}
];
  
const AddHour = inject("MainStore", "InputStore")(observer((props) => { 

    const [hours , setHours] = useState(props.InputStore.hours)

    // useEffect(() => {
    //   if(props.edit) {
    //     console.log(`trying to edit`)
    //     insertData()
    //   }
    // }, [])

    // const insertData = () => {
    //     setHours(props.times)
    // }

    const inputHandler = async (e) => {
        if(hours.length) {
            const newHours = [...hours]
            newHours.push(e.target.value)
            setHours(newHours)
            props.InputStore.handleHours(e.target.value)
        } else {
            props.InputStore.handleHours(e.target.value)
            setHours([e.target.value])
        }
         
    }


    const deleteTime = hour => {
        if(hours.length > 1) {
            const newHours = [...hours]
            const i = newHours.findIndex(h => h === hour)
            newHours.splice(i, 1)
            setHours(newHours)
            props.InputStore.deleteHour(hour)
        } else {
            props.InputStore.deleteHour(hour)
            setHours([])
        }
    }
    
    return (
        <Grid >
        <TextField
            id="outlined-select-hours"
            select
            label="Favorite hours"
            value={hours}
            name={"hours"}
            onChange={inputHandler}
            helperText="Please select your favorite hours"
            variant="outlined"
            >
            {hoursArr.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </TextField>
        {hours.length ?  props.InputStore.hours.map(h => <Hour delete={deleteTime} time={h}/>) : null}
    </Grid>

        
    )
}))

export default AddHour
