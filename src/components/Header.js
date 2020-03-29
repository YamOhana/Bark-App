import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
    const Header = () => { 

        return (
            <div>
                <span id='dropdown'>+D   </span>
                <span id='appName'>  Bark  </span>
                <span id='myPic'>  pic  </span>
            </div>
        )
    }

    export default Header