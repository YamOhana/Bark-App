import React from 'react';
import { observer, inject } from 'mobx-react'
import DashboardComponent from './Dasboard/dashboard';
const firebase = require("firebase");

@inject("MainStore")
class MainChat extends React.Component{




    render(){
        if(this.props.curUser)
        return <DashboardComponent user={this.props.curUser}></DashboardComponent>

        



    }


}

export default MainChat