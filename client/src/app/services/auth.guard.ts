import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,ActivatedRoute} from '@angular/router';
import {sharedService} from '../services/sharedService';
@Injectable()
export class AuthGuard implements CanActivate {
    ss:sharedService;
    constructor(private router: Router,myRoute:ActivatedRoute,ss:sharedService) {
        this.ss=ss;
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.ss.change();
            return true;
        }
        debugger;
        this.ss.changeFalse();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}