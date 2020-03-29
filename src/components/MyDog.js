import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const MyDog = () => { 

        return (
            <div>
                Im MyDog
            </div>
        )
    }

    export default MyDog