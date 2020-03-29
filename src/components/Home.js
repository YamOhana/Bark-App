import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Navbar from './Navbar'
import Users from './Users'


// @inject("MainStore")

@observer
class Home extends Component {

    render () {
        return (
            <div>
                I'm Home 
                <Navbar />
                <Users />
            </div>
        )
    }
}

export default Home