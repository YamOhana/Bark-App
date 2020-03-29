import React, { Component } from 'react';
import fire from '../Fire';
import { observer, inject } from 'mobx-react'
import Navbar from './Navbar'
import Users from './Users'
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
                <Navbar />
                <Users />
                <AddUser />
            
            <button onClick={this.logout}>
                Log Out
            </button>

            </div>
        )
    }

}

export default Home;
