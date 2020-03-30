import React, { useState } from 'react';
import { observer, inject } from 'mobx-react'



const Feed = inject("MainStore", "InputStore")(observer((props) => { 

    return (
        <div>
            {props.MainStore.posts.map(p => {return <div>{p}</div>})}
        </div>
    )

}))

export default Feed