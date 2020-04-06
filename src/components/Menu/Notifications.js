import React from 'react';
import { observer, inject } from 'mobx-react'
import Card from '@material-ui/core/Card';
import Notification from './Notification';

const Notifications = inject("MainStore")(observer((props) => {
    return (
        <Card className='NotificationsComponent'>

            {
                props.MainStore.owners.map(o => {

                   return props.requestsIds.includes(o.id) ?
                            <Notification user={o} /> : null

                })

            }
        </Card>


    )
}))


export default Notifications




