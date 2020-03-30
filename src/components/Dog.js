import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'


const Dog = inject("MainStore")(observer((props) => { 


    return (
        <div>
            I'M A DOG AND MY NAME IS {props.d.name}
        </div>
    )
}))


export default Dog







