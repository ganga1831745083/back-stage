import {observable,makeAutoObservable,action} from 'mobx';
import React from 'react';

export default class UserStore {
    //被观察者
    @observable
    public username:string = ''
    constructor(username:string = ''){
        this.username = username
        makeAutoObservable(this)
    }
    @action
    changeName=(name:string)=>{
        this.username=name
    }
}