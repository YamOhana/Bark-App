import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'




const Hour = inject("MainStore", "InputStore")(observer((props) => {

    // const [hour, setHour] = useState(props.time)
     
    const deleteTime = () => {
        props.delete(props.time)
    }

    return (
        <div>
            <span>{props.time}</span>
            <span onClick={deleteTime}>-</span>
        </div>
    )
 }))

 export default Hour