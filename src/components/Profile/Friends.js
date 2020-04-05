import React from 'react'
import { observer, inject } from 'mobx-react'
import Dog from '../Dogs/Dog';
import DogFriends from './FriendDogs'
import Button from '@material-ui/core/Button';

const Friends = inject("MainStore")(observer((props) => { 


    const onWalk = () => {

        if(props.o.onwalk){
            return onWalk
        }
    }

    return (
        <div>
                <Button variant="contained" onClick={onWalk}>on walk</Button>

                 {props.MainStore.curFriends.map(f => {
                    return f.dogs.map(d => <DogFriends d={d} o={f} />)
            })
            }
        </div>
    )}
))

export default Friends;
