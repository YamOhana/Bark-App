import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Navbar from './Navbar'
import SidePanel from './Menu/SidePanel'
import NavbarLeftMenu from './Menu/NavbarLeftMenu'
import Header from './Header'
import Dogs from './Dogs'
import Profile from './Profile/Profile'
import AddDog from './AddDog';
import AddUser from './AddUser'

import axios from 'axios'

@inject("MainStore")

@observer
class Home extends Component {
    
    render() {

        return (
            <div>
                <Navbar />
                <Dogs />
            </div>
        )
    }

}

export default Home;
