import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import fire from '../Fire';
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
    constructor(props) {
        super();
        // this.logout = this.logout.bind(this);

    }



    // async componentDidMount() {
    //     const users = await this.getUsers()
    //     console.log(users.data)

    //     const currentUser = await this.getCurrentUser()
    //     console.log(currentUser.data);

    //     this.props.MainStore.getData({owners:users.data,user:currentUser.data})
    // }

    // getUsers = async () => {
    //     return await axios.get('http://localhost:3001/users')
    // }
    // getCurrentUser = async () => {

    //     const curUser = await fire.auth().currentUser
    //     if (curUser) {
    //         return await axios.get(`http://localhost:3001/user/${curUser.uid}`)
    //     }

    // }


    logout = () => {
        console.log(`trying to logout`)
        this.props.logout()
        console.log(`loged out`)
    }

    render() {

        return (
            <div>
                <Router>

                <div>I'm Home</div>

                <NavbarLeftMenu />
                <Navbar />
                <Dogs />


                
                <Route path='/home' exact component={Home}></Route>
                <Route path="/profile" exact component={Profile}></Route>


                <button onClick={this.logout}>
                    Log Out
                </button>

                </Router>
            </div>
        )
    }

}

export default Home;
