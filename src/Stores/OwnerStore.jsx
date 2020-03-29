
import { observable, action, computed } from 'mobx';
import axios from 'axios';


export class Owner {

    @observable status = 1
    @observable activeMaker = false
    @observable currUser


    @action async getOwnerDetails(email) {
        let ownerDetails = await axios.get(`owner-route/${email}`)
        ownerDetails = ownerDetails.data
        this.currUser = ownerDetails
    }

    @action changeStatus = (userStatus = 1) => {

        if (this.activeMarker) {
            if (this.status <= 2) {
                this.status += 1
            } else if (this.status === 3) {
                this.status = 1
            }
            return this.status
        } else {
            alert("please if walk or park")
        }
    }

    @action changeUserStatus = async (ownerId) => {
        let ownerAndDog = await axios.get(`owner/dog/${ownerId}`)
        let newStatus = this.changeStatus(ownerAndDog.data[0].owner_status)
        await axios.put(`ownerr/${ownerId}`, { userStatus: newStatus })
    }

    @action addDogToOwner(dog) {
        this.dogs.push(dog)
    }

    @action async getOwnerDogs(ownerId) {
        if (ownerId) {
            let dogs = await axios.get(`owner/dog${ownerId}`)
            dogs = dogs.data
            if (dogs.length) {
                this.dogs = dogs
            }
        }
    }




    @action changeFriendShipStatus() {
        return axios.get('/changes-friendship-tatus')
            .then(() => console.log('friend-added'));

    }


    @action  acceptFriendship(id) {

        return axios.post(`/api/accept-friendship/${id}`)
            .then(() => {
                return {type: "Friendship accepted"}
            })
    }

    @action  deleteFriendship(id) {

        return axios.post(`/api/delete-friendship/${id}`)
            .then(() => {
                return {type: "Friendship-deleted"}
            })
    }

}