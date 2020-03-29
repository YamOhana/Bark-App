import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import User from './Dog';


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const Users = () => { 

        return (
            <div>
                Im Users
                <User />
            </div>
        )
    }

    export default Users