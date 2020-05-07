import React, { Component } from 'react';

import { observer, inject } from 'mobx-react'
import Navbar from '../Filters/Navbar'

import Dogs from '../Dogs/Dogs'



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
                <br></br>
            </div>
        )
    }

}

export default Home;
