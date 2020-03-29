import React, {component} from 'react'
import { inject, observer } from 'mobx-react'
import { MainStore } from '../Stores/MainStore'

@inject (MainStore)
@observer

class statusBtn extends component {

    changeUserStatus =() =>{
        const ownerId = this.props.ownerId
        this.props.MainStore.changeUserStatus(ownerId)
    }

    

}