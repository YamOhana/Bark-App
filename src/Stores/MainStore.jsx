import { observable, action, computed } from 'mobx';
import axios from 'axios';



export class MainStore {
    @observable owners =[]
    @observable curUser

    @action getData = async dataArr => {
        this.owners = dataArr.owners
        this.curUser = dataArr.user
    }

    @action addDogToOwner(ownerId, dog) {
        let owner = this.owners.find(o => o.id === ownerId)
        owner.dogs.push(dog)
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




    @action saveNewDog = async () => {
        let dogOfOwner = await axios.post('/*owner rout */', {

            name: this.name,
            gender: this.gender,
            park: this.park,
            vaccinated: this.vaccinated,
            neutered: this.neutered,
            age: this.age,
            size: this.size,
            type: this.type,
            nature: this.nature,
            image: this.image
        })
        return dogOfOwner.data

    }



    @action editDogField = async (fieldName, dog) =>{
        const dogId = dog.id
        await axios.put(`/dog-profile/${dogId}`, {
            fieldName,
            fieldVal = dog[fieldName]
        })

    }




    

}
