import { observable, action } from "mobx";
import axios from 'axios';


export class Inputs {


    //owner
    @observable firstName
    @observable lastName
    @observable birthDate
    @observable phoneNum
    @observable address
    @observable gender = "male"
    @observable smoker = false
    @observable hours


    //dog
    @observable dogName
    @observable dogGender
    @observable park = "null"
    @observable vaccinated = false
    @observable neutered = false
    @observable image
    @observable dogBirthDate
    @observable size = "small"
    @observable type
    @observable shy = false
    @observable energetic = false
    @observable dominant = false
    



    @action handleInput = (name, val) => {
        this[name] = val
    }

}