import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'


const Dog = inject("MainStore")(observer((props) => { 

    

    return (
        <div>
            <span>I'm {props.d.name},a {props.d.size} size {props.d.type} {props.d.dogGender} Dog</span>
            <span>I'm {props.d.vaccinated ? null : 'NOT!'} Vaccinated</span>
            <span>I'm {props.d.neutered ? null : 'NOT!'} Neutered</span>
            <span>{props.d.shy ? 'Shy': null}</span>
            <span>{props.d.energetic ? 'Dnergetic': null}</span>
            <span>{props.d.dominant ? 'Dominant': null}</span>

        </div>
    )
}))


export default Dog







