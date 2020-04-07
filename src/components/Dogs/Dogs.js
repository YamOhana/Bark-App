import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Dog from './Dog';



const Dogs = inject("MainStore")(observer((props) => { 
    return (
        <div>
            { props.MainStore.isFiltering ?
            props.MainStore.filteredOwners.map(o => {
                // console.log(`filtering!!!!!!!`)
                // console.log(props.MainStore.filters.range)
                return (props.MainStore.curUser &&(!props.MainStore.curUser.friends.includes(o.id) && props.MainStore.curUser.id!=o.id)?
                o.dogs.map(d => <Dog d={d} o={o} />):null)
            }) :

            props.MainStore.owners.map(o => {
                // console.log(`not filtering`)
                // console.log(props.MainStore.filters.range)
                return (props.MainStore.curUser && (!props.MainStore.curUser.friends.includes(o.id) && props.MainStore.curUser.id!=o.id)?
                 o.dogs.map(d => <Dog d={d} o={o} />):null)
            })
            }
        </div>
    )
}))

export default Dogs