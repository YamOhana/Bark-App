import React from 'react'
import { observer, inject } from 'mobx-react'
import Dog from '../Dog';

   
const Friends = inject("MainStore")(observer((props) => { 
    return (
        <div>
            Im Friends
            {
            props.MainStore.curFriends.map(f => {
                    return f.dogs.map(d => <Dog d={d} o={f} />)
            })
            }
        </div>
    )}
))

export default Friends;
