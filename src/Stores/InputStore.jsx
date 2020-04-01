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
    @observable smoker = false
    @observable hours =[]


    //dog
    @observable dogName
    @observable dogGender
    @observable park
    @observable vaccinated = false
    @observable neutered = false
    @observable image
    @observable dogBirthDate
    @observable size 
    @observable type
    @observable shy = false
    @observable energetic = false
    @observable dominant = false

    //feed
    @observable comment

    //OnWalk button
    @observable onwalk 
    

    @action handleInput = (name, val) => {
        this[name] = val
    }

    @action handleHours = val => {
        this.hours.push(val)
        // console.log(this.hours)
    }

    @action deleteHour = val => {
        const i = this.hours.findIndex(h => h === val)
        console.log(this.hours[i])
        console.log(i)
        this.hours.splice(i, 1)
    }

}