import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Dog from './Dog'

// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const User = () => { 
        








        return (
            <div>
                Im User
                <Dog />
            </div>
        )
    }

    export default User