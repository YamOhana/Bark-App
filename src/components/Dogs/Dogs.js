import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'
import Dog from './Dog';



const Dogs = inject("MainStore")(observer((props) => { 
    
    return (
        <div>
            Im Dogs
            { props.MainStore.isFiltering ?
            props.MainStore.filteredOwners.map(o => {
                // console.log(`filtering!!!!!!!`)
                // console.log(props.MainStore.filters.range)
                return o.dogs.map(d => <Dog d={d} o={o} />)
            }) :

            props.MainStore.owners.map(o => {
                // console.log(`not filtering`)
                // console.log(props.MainStore.filters.range)
                return o.dogs.map(d => <Dog d={d} o={o} />)
            })
            }
        </div>
    )
}))

export default Dogs