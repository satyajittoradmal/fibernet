import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
@Component({
    moduleId: module.id,
    template: '<div></div>',
})

export class LogoutComponent implements OnInit {

    router: Router;

    constructor(router: Router, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.router = router;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
    }
    ngOnInit() {
        localStorage.removeItem('currentUser');
        this.toastyService.default('Please login !!!');
        this.router.navigate(['/home']);
    }

}