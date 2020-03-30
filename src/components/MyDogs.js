import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import MyDog from './MyDog'

@inject("MainStore")
@observer
const MyDogs = (props) => { 





 componentDidMount = async () =>{

 }



    return (
        <div>
            Im MyDogs
        </div>
    )
    
}

export default MyDogs