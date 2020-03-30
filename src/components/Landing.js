import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import fire from '../Fire';
import { observer, inject } from 'mobx-react'
import NavbarLeftMenu from './Menu/NavbarLeftMenu'      
import Profile from './Profile/Profile'
import Home from './Home'

import axios from 'axios'

@inject("MainStore")

@observer
class Landing extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

    }

    async componentDidMount() {
        const users = await this.getUsers()
        console.log(users.data)
        const currentUser = await this.getCurrentUser()
        console.log(currentUser.data);
        this.props.MainStore.getData({owners:users.data,user:currentUser.data})
    }

    getUsers = async () => {
        return await axios.get('http://localhost:3001/users')
    }
    getCurrentUser = async () => {
        const curUser = await fire.auth().currentUser
        if (curUser) {
            return await axios.get(`http://localhost:3001/user/${curUser.uid}`)
        }
    }

    logout() {
        fire.auth().signOut();
    }

    render() {

        return (
            <Router>
                <div className="landing">
                
                    <div id="main-links">
                        <NavbarLeftMenu />
                        {/* <Link to="/">Home</Link>
                        <Link to="/Profile">Profile</Link> */}
                    </div>

                    <Route path="/" exact render={() => <Home key='homePage' logout={this.logout}/>}/>
                    <Route path="/Profile" exact render={() => <Profile key='profilePage'/>}/>
                </div>
            </Router>
        )
    }

}

export default Landing;
