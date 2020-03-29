import { observable, action } from "mobx";
import axios from 'axios';
import Inputs from './InputStore'
// import OwnerStore from "./OwnerStore";



class DogStore {

  


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


    @action async getDog(dogId){
        let dog = await axios.get(`dog-Route/${dogId}`)
        dog = dog.data
        this.dogForEdit = dog
    }


    @action editDogField = async (fieldName, dog) =>{
        const dogId = dog.id
        await axios.put(`/dog-profile/${dogId}`, {
            fieldName,
            fieldVal = dog[fieldName]
        })

    }



}


export default DogStore;