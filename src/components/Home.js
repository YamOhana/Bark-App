import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Navbar from './Filters/Navbar'
import SidePanel from './Menu/SidePanel'
import NavbarLeftMenu from './Menu/NavbarLeftMenu'
import Header from './Header'
import Dogs from './Dogs'
import Profile from './Profile/Profile'
import AddDog from './Handlers/AddDog';
import AddUser from './Handlers/AddUser'

import axios from 'axios'

@inject("MainStore")

@observer
class Home extends Component {
    constructor(props) {
        super(props);
       

    }



static logout = () => {
        console.log(`trying to logout`)
        this.props.logout()
        console.log(`loged out`)
    }

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
