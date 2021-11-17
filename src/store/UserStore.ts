import {observable,makeAutoObservable,action} from 'mobx';
import {getVal,setVal} from './server'
import {Storage} from '../utils/storage'
let storage = new Storage('');
export default class UserStore {
    //被观察者
    @observable
    public username:string = storage.getItem("data")!=''?JSON.parse(storage.getItem("data")).data.user_name:''
    constructor(username:string = storage.getItem("data")!=''?JSON.parse(storage.getItem("data")).data.user_name:''){
        this.username = username
        makeAutoObservable(this)
    }
    @action
    changeName=(name:string)=>{
        this.username=name
        setVal("username", this.username)  
    }
}