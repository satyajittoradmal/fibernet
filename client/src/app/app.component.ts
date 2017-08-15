import { Component ,OnInit,Inject } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {sharedService} from './services/sharedService';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  isLoginDone : boolean = false;
  ss:sharedService;
  router:Router;
  subscription:any;
   constructor(ss:sharedService,router:Router){
      this.isLoginDone = false;
      this.ss=ss;
      this.router=router;
    }
    
    
    
    ngOnInit() {
    this.subscription = this.ss.getEmittedValue()
      .subscribe(item => this.isLoginDone=item);
  }
  
}


