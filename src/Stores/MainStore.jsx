import { observable, action, computed } from 'mobx';
import axios from 'axios';
import data from './data.json'
import allPosts from './posts.json'


export class MainStore {
    @observable owners = []
    @observable filteredOwners = []
    @observable curUser
    @observable userIndex
    @observable posts = []
    @observable filters = { 
        age: 'none', 
        size: 'none',
        nature: 'none'
    }
    
    @computed get isFiltering() {
        if(this.filters. age === 'none' && this.filters.nature === 'none' && this.filters.size === 'none') {
            return 0
        } 
        return 1
    }

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

    @action updateFilters = (filterType, val) => this.filters[filterType] = val

    @action filterAge = (owner, term) => {
        const range = term.split("-")
        const dogAge = this.calculateAge(owner.dogs[0].dogBirthDate)
        console.log(range)
        console.log(dogAge)
        if(dogAge[0] === 0 && range[0] == "0.5") {
            if(dogAge[1] > 5) {
                return 1
            }
        }
        if(dogAge[0] >= parseInt(range[0]) && dogAge[0] <= parseInt(range[1])) {
            return 1
        }
        return 0
    }

    @action filterSize = (owner, term) => {
        if(owner.dogs[0].size === term) {
            return 1
        }
        return 0
    }

    @action filterNature = (owner, term) => {
        if(owner.dogs[0][term]) {
            return 1
        }
        return 0
    }

    @action filterOwners = () => {
        let newOwners = []
        for(let owner of this.owners) {
            let control = 0
            let filterCheck = 0
            if(this.filters.age !== 'none') {
                control++
                filterCheck += this.filterAge(owner, this.filters.age)
            }
            if(this.filters.size !== 'none') {
                control++
                filterCheck += this.filterSize(owner, this.filters.size)
            }
            if(this.filters.nature !== 'none') {
                control++
                filterCheck += this.filterNature(owner, this.filters.nature)
            }
            if(control === filterCheck) {
                console.log(`pushed`);
                newOwners.push(owner)
            }
        }
        this.filteredOwners = newOwners
    }

    @action calculateAge = birthday => {
        const today = new Date()
        const todayYear = today.getFullYear()
        const todayMonth = today.getMonth() + 1
        const birth = birthday.split("-")
        const birthYear = parseInt(birth[0])
        const birthMonth = parseInt(birth[1])
        if(todayMonth >= birthMonth) {
                const age = [(todayYear - birthYear), (todayMonth - birthMonth)]
                return age
        } else {
            if(todayYear > birthYear) {
                const age = [(todayYear - birthYear - 1), (12 + todayMonth - birthMonth)]
                return age
            } else {
                const age = [0, (12 + todayMonth - birthMonth)]
                return age
            }
        }
        
    }


    
}
