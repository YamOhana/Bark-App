import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Dog from './Dog';



const Dogs = inject("MainStore")(observer((props) => { 

    return (
        <div>
            Im Dogs
            {props.MainStore.owners.map(o => {
                    return o.dogs.map(d => <Dog d={d}/>)
            })}
        </div>
    )
}))

export default Dogs