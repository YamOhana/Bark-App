import React, { Component } from 'react';
import fire from '../Fire';
import { observer, inject } from 'mobx-react'
import Navbar from './Navbar'

import Header from './Header'
import Dogs from './Dogs'
import AddDog from './AddDog';
import AddUser from './AddUser'

import axios from 'axios'

@inject("MainStore")

@observer
class Home extends Component {
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
            <div>

                <div>I'm Home</div>

                {/* <Header /> */}
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
