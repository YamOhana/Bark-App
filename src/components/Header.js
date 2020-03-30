import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
// import SidePanel from './SidePanel';


// const Client = inject("MainStore", "InputStore")(observer((props) => { 
const Header = () => {



    function openSideBar() {
        // document.getElementById('side-panel-button').style.width = "200px"
        console.log(`side open`)
    }


    return (
        <div>
            <span id='appName'>  Bark  </span>
            {/* <span id='dropdown'><button id="side-panel-button" onClick={openSideBar()}>+</button><SidePanel /> </span> */}
            <span id='dropdown'><button id="side-panel-button" onClick={openSideBar()}>+</button></span>
            <span id='myPic'>  pic  </span>
        </div>
    )
}

export default Header