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


    //dog
    @observable dogName
    @observable dogGender 
    @observable park
    @observable vaccinated 
    @observable neutered 
    @observable image
    @observable dogBirthDate
    @observable size 
    @observable type
    @observable shy 
    @observable energetic 
    @observable dominant 

    //feed
    @observable comment

    //OnWalk button
    @observable onwalk 
    
    //upload image
    @observable newImage

    @action handleInput = (name, val) => {
        this[name] = val
        // if(name === "address" || name === "park") {
        //     console.log(name);
        //     console.log(val);
        // }
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