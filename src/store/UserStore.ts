import {observable,makeAutoObservable,action} from 'mobx';
import {getVal,setVal} from './server'

export default class UserStore {
    //被观察者
    @observable
    public username:string = getVal("username", '')
    constructor(username:string = getVal("username", '')){
        this.username = username
        makeAutoObservable(this)
    }
    @action
    changeName=(name:string)=>{
        this.username=name
        setVal("username", this.username)  
    }
}