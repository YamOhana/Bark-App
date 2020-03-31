import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Hour from './Hour'




const AddHour = inject("MainStore", "InputStore")(observer((props) => { 

    const [hours , setHours] = useState(props.InputStore.hours)

    const inputHandler = (e) => {
        props.InputStore.handleHours(e.target.value)
        setHours(e.target.value) 
    }
    
    return (
        <div>
            <label htmlFor="hours">Prefered Hours</label>
            <select type="text" id="hours" value={hours} name="hours" onChange={inputHandler}>
                <option value="08:00-09:00">08:00-09:00</option>
                <option value="09:00-10:00">09:00-10:00</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="11:00-12:00">11:00-12:00</option>
                <option value="12:00-13:00">12:00-13:00</option>
                <option value="13:00-14:00">13:00-14:00</option>
                <option value="14:00-15:00">14:00-15:00</option>
                <option value="15:00-16:00">15:00-16:00</option>
                <option value="16:00-17:00">16:00-17:00</option>
                <option value="17:00-18:00">17:00-18:00</option>
                <option value="18:00-19:00">18:00-19:00</option>
                <option value="19:00-20:00">19:00-20:00</option>
                <option value="20:00-21:00">20:00-21:00</option>
                <option value="21:00-22:00">21:00-22:00</option>
                <option value="22:00-23:00">22:00-23:00</option>
                <option value="23:00-00:00">23:00-00:00</option>
            </select>
            <br></br>

            {props.InputStore.hours ? props.InputStore.hours.map(h => <Hour time={h}/>) : null}
            {/* {props.InputStore.hours ? props.InputStore.hours.map(h => {return <div>{h}<span onClick={props.InputStore.deleteHour(h)}>      -</span></div>}) : null} */}
        </div>
    )
}))

export default AddHour