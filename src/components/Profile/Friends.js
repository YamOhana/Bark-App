import React from 'react'
import { observer, inject } from 'mobx-react'
import Dog from '../Dogs/Dog';
import DogFriends from './FriendDogs'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const Friends = inject("MainStore")(observer((props) => { 


 

    return (
        <div classNamae='my-friends'>
            <List>
                 {props.MainStore.curFriends.map(f => {
                     return f.dogs.map(d => <DogFriends d={d} o={f} />)
                    })
                }
            </List>
                 
            <Divider variant="middle" />

        </div>
    )}
))

export default Friends;


// props.o.onwalk