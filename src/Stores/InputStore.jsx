import { observable, action } from "mobx";
import axios from 'axios';


export class Inputs {


    //owner
    @observable name
    @observable birthDate
    @observable email
    @observable phoneNum
    @observable address
    @observable gender
    @observable smoker
    @observable hours


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
    



    @action handleInput = (name, val) => {
        this[name] = val
    }

}