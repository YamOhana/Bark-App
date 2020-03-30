import React, { Component } from 'react';
import fire from '../Fire';
import { observer, inject } from 'mobx-react'
import Navbar from './Navbar'
import SidePanel from './Menu/SidePanel'
import NavbarLeftMenu from './Menu/NavbarLeftMenu'
import Header from './Header'
import Dogs from './Dogs'
import AddDog from './AddDog';
import AddUser from './AddUser'


@inject("MainStore")

@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {

        return (
            <div>

                <div>I'm Home</div>
                <NavbarLeftMenu />
                <Navbar />

                <Dogs />
                
            
            <button onClick={this.logout}>
                Log Out
            </button>

            </div>
        )
    }

}

export default Home;
