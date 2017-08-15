import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core';


@Injectable()
export class sharedService {
  @Output() fire:EventEmitter<any>=new EventEmitter();
  @Output() dataChangeObserver: EventEmitter<any>=new EventEmitter();
  data:any;
  storage:any =[];
   constructor(){
     console.log('shared service started');
   }
 
   change()
   {
    console.log('change started true'); 
     this.fire.emit(true);
   }
    changeFalse()
   {
    console.log('change started false'); 
     this.fire.emit(false);
   }
   
   getEmittedValue()
   {
     return this.fire;
   }
   store(model:any){
        this.storage.push(model);
   }
   getStorage(){
        return this.storage;
   }
   setData(data:any) {
    this.data = data;
    this.dataChangeObserver.emit(this.data); 
    return this.dataChangeObserver;
  } 
 
} 