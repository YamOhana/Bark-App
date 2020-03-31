import { observable, action, computed } from 'mobx';
import axios from 'axios';
import data from './data.json'
import allPosts from './posts.json'


export class MainStore {
    @observable owners = [...data]
    @observable curUser
    @observable userIndex
    @observable posts = [...allPosts]

    @action getData = dataArr => {
        console.log(dataArr)
        this.owners = dataArr.owners
        this.curUser = dataArr.user
        this.userIndex = this.owners.findIndex(o => o.id === this.curUser.id)
    }


    @action getPosts = data => {
        this.posts = data
    }

    @action addPost = post => {
        this.posts.unshift(post)
    }

    @action addDogToOwner = dog => this.owners[this.userIndex].dogs.push(dog)
    
    @action  acceptFriendship = friendId => this.owners[this.userIndex].friends.push(friendId)

    @action addFriend = friendId => {
        let friend = this.owners.find(o => o.id === friendId)
        
        friend.requests.push(this.curUser.id)
        
    }

    @action  deleteFriend = friendId => {
        let owner = this.owners[this.userIndex]
        const friendIndex = owner.friends.friendIndex(f => f === friendId)
        owner.friends.splice(friendIndex, 1)
    }

    @action editDogField = (dogId, fieldName, data) => {
        let dog = this.owners[this.userIndex].dogs.find(d => d.id === dogId)
        dog[fieldName] = data
    }    

    @action editProfile = (fieldName, data) => this.owners[this.userIndex][fieldName] = data
    
}
