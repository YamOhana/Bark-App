import React, { useState } from 'react';
import { Layout, Divider, Avatar, Icon, Button } from 'antd';
import { observer, inject } from 'mobx-react'

const MyDog = inject("MainStore")(observer((props) => { 


    return (
        <div className="my-dog">
                <Avatar className="dog-avatar" size={50} src={dogImage}/>
                <span id="dog-name">{props.d.name}</span>
                <span>{this.props.MainStore.editDogField(d=> d.name)} </span>
        </div>
    )
}))


export default MyDog