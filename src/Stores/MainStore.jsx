import { observable, action, computed } from 'mobx';
import axios from 'axios';



export class MainStore {
    @observable owners
    @observable curUser

    @action getData = async dataArr => {
        this.owners = dataArr
        this.curUser = dataArr
    }


    

}
