import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Dog from './Dog';


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const Dogs = () => { 

        return (
            <div>
                Im Dogs
                <Dog />
            </div>
        )
    }

    export default Dogs