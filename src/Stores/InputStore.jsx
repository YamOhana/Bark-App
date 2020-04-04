import { observable, action } from "mobx";
import axios from 'axios';


export class Inputs {


    //owner
    @observable firstName
    @observable lastName
    @observable birthDate
    @observable phoneNum
    @observable address
    @observable gender
    @observable smoker
    @observable hours = []
    @observable userImages = []


    //dog
    @observable dogName
    @observable dogGender
    @observable park
    @observable vaccinated
    @observable neutered
    @observable dogImages = []
    @observable dogBirthDate
    @observable size
    @observable type
    @observable shy
    @observable energetic
    @observable dominant

    //feed
    @observable comment
    @observable commentPictures = []

    //OnWalk button
    @observable onwalk

    //upload image
    @observable newImage

    // Filters
    @observable range
    // @observable natureFilter
    // @observable ageFilter
    // @observable sizeFilter

    @action handleInput = (name, val) => {
        this[name] = val
        // if(name === "address" || name === "park") {
        //     console.log(name)
        //     console.log(val)
        // }
    }

    @action handleHours = val => {
        this.hours.push(val)
    }

    @action handleArrayInput = (name, val) => {
        this[name].push(val)
    }

    @action deleteHour = val => {
        const i = this.hours.findIndex(h => h === val)
        console.log(this.hours[i])
        console.log(i)
        this.hours.splice(i, 1)
    }

}