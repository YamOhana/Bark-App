import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import '../styles/Navbar.css'


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const Navbar = () => { 

        return (
            <div>
                <span className='mainFilter'><input placeholder='filter'></input></span>
                <span className='mainFilter'><input placeholder='filter'></input></span>
                <span className='mainFilter'><input placeholder='filter'></input></span>
                <span className='mainFilter'><button>Advanced</button> </span>
            </div>
        )
    }

    export default Navbar