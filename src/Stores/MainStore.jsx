import { observable, action, computed } from 'mobx';
import axios from 'axios';
import data from './data.json'
import allPosts from './posts.json'


export class MainStore {
    @observable owners = []
    @observable filteredOwners = []
    @observable curUser
    @observable curFriends = []
    @observable userIndex
    @observable chats = []
    @observable posts = []
    @observable filters = {
        age: null,
        size: null,
        nature: null,
        range: 100
    }

    @computed get isFiltering() {
        if (!this.filters.age && !this.filters.nature && !this.filters.size && this.filters.range == 100) {
            // console.log(this.filters.range)
            return false
        }
        return 1
    }

    @computed get isOnWalk() {
        return this.curUser.onwalk
    }

    @action getData = dataArr => {
        this.owners = dataArr.owners
        this.curUser = dataArr.user
        // this.userAddress = dataArr.user.address
        this.userIndex = this.owners.findIndex(o => o.id === this.curUser.id)
        this.curFriends = this.getMyFriends()
    }

    @action updateDog = (index, dog) => {
        for(let i = 0; i < this.curUser.dogs; i++) {
            if(i === index) {
                this.curUser.dogs[i] = dog
            }
        }
        return this.curUser.dogs
    }

    @action getPosts = data => this.posts = data

    @action goOnWalk = bool => {
        this.owners[this.userIndex].onwalk = bool
        this.curUser.onwalk = bool
    }

    @action addPost = post => this.posts.unshift(post)

    @action addMessage = message => this.chats.messages.unshift(message)

    @action addChat = chat => this.chats.chat.unshift(chat)

    @action addDogToOwner = dog => {
        this.owners[this.userIndex].dogs.push(dog)
        this.curUser.dogs.push(dog)
    }

    @action acceptFriendship = friendId => {
        this.owners[this.userIndex].friends.push(friendId)
        this.curUser.friends.push(friendId)
    }

    @action addFriend = friendId => {
        let friend = this.owners.find(o => o.id === friendId)
        friend.requests.push(this.curUser.id)
        this.curFriends.push(friend)
    }

    @action deleteFriend = friendId => {
        let owner = this.owners[this.userIndex]
        const friendIndex = owner.friends.friendIndex(f => f === friendId)
        owner.friends.splice(friendIndex, 1)
        this.curUser.friends.splice(friendIndex, 1)
    }

    @action editDogField = (dogId, fieldName, data) => {
        let dog = this.owners[this.userIndex].dogs.find(d => d.id === dogId)
        let curDog = this.curUser.dogs.find(d => d.id === dogId)
        dog[fieldName] = data
        curDog[fieldName] = data
    }

    @action editProfile = (fieldName, data) => {
        this.owners[this.userIndex][fieldName] = data
        this.curUser[fieldName] = data
    }

    @action updateFilters = (filterType, val) => this.filters[filterType] = val



    @action filterAge = (owner, term) => {
        const ageRange = term.split("-")
        const dogAge = this.calculateAge(owner.dogs[0].dogBirthDate)
        if (!dogAge) { return 0 }
        if (dogAge[0] === 0 && ageRange[0] == "0.5") {
            if (dogAge[1] > 5) {
                return 1
            }
        }
        if (dogAge[0] >= parseInt(ageRange[0]) && dogAge[0] <= parseInt(ageRange[1])) {
            return 1
        }
        return 0
    }

    @action filterRange = (owner, term) => {
        if (term === 100) { return 1 }
        if (!owner.homeCoord) {
            return 0
        } else {
            const userCord = this.owners[this.userIndex].homeCoord
            const dist = this.calculateDistance(userCord.lat, userCord.lng, owner.homeCoord.lat, owner.homeCoord.lng)
            if (dist === null) {
                console.log(`dist is undefined ${dist}`);
                return 0
            } else if (dist <= term / 20) {
                // console.log(dist)
                // console.log(term /20)
                return 1
            } else {
                // console.log(dist)
                // console.log(term /20)
                return 0
            }
        }
    }

    @action filterSize = (owner, term) => {
        if (owner.dogs[0].size === term) {
            return 1
        }
        return 0
    }

    @action filterNature = (owner, term) => {
        if (owner.dogs[0][term]) {
            return 1
        }
        return 0
    }

    @action filterOwners = () => {
        let newOwners = []
        for (let owner of this.owners) {
            let control = 0
            let filterCheck = 0
            if (this.filters.age) {
                control++
                filterCheck += this.filterAge(owner, this.filters.age)
            }
            if (this.filters.size) {
                control++
                filterCheck += this.filterSize(owner, this.filters.size)
            }
            if (this.filters.nature) {
                control++
                filterCheck += this.filterNature(owner, this.filters.nature)
            }
            if (this.filters.range) {
                if (this.filters.range >= 100) {
                    control++
                    filterCheck++
                } else if (this.filters.range >= 0) {
                    control++
                    if (!this.owners[this.userIndex].homeCoord) {
                        filterCheck++
                    } else {
                        filterCheck += this.filterRange(owner, this.filters.range)
                    }
                }
            }
            if (control === filterCheck) {
                newOwners.push(owner)
            }
        }
        this.filteredOwners = newOwners
    }

    @action calculateAge = birthday => {
        if (!birthday) {
            console.log(`birthday is null ${birthday}`);
            return null
        }
        const today = new Date()
        const todayYear = today.getFullYear()
        const todayMonth = today.getMonth() + 1
        const birth = birthday.split("-")
        const birthYear = parseInt(birth[0])
        const birthMonth = parseInt(birth[1])
        if (todayMonth >= birthMonth) {
            const age = [(todayYear - birthYear), (todayMonth - birthMonth)]
            return age
        } else {
            if (todayYear > birthYear) {
                const age = [(todayYear - birthYear - 1), (12 + todayMonth - birthMonth)]
                return age
            } else {
                const age = [0, (12 + todayMonth - birthMonth)]
                return age
            }
        }

    }

    @action getMyFriends = () => {
        const friendsId = this.curUser.friends
        let myFriends = []
        for (let owner of this.owners) {
            if (friendsId.includes(owner.id)) {
                myFriends.push(owner)
            }
        }
        return myFriends
    }

    @action calculateDistance = (lat1, lng1, lat2, lng2) => {
        if (lat1 == undefined || lat2 == undefined || lng1 == undefined || lng2 == undefined) { return null }
        if ((lat1 == lat2) && (lng1 == lng2)) {
            return 0;
        }
        else {
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lng1 - lng2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344
            return dist;
        }
    }
}
