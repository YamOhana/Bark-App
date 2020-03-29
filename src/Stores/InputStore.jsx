import { observable, action } from "mobx";
import axios from 'axios';


export class Inputs {


    //owner
    @observable name
    @observable age
    @observable email
    @observable phoneNum
    @observable address
    @observable gender
    @observable smoker
    @observable hours


    //dog
    @observable dogName
    @observable gender
    @observable park
    @observable vaccinated
    @observable neutered
    @observable image
    @observable age
    @observable size
    @observable type
    @observable nature


    @action handleInput = (name, val) => {
        this[name] = val
    }

}