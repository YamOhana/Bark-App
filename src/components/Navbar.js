import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const Navbar = () => { 

        return (
            <div>
                <span className='mainFilter'>filter 1 </span>
                <span className='mainFilter'> filter 2 </span>
                <span className='mainFilter'> filter 3 </span>
                <span className='mainFilter'> Advance </span>
            </div>
        )
    }

    export default Navbar