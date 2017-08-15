import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { sharedService } from '../services/sharedService';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    router: Router;

    ss: sharedService;
    constructor(ss: sharedService, router: Router, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.ss = ss;
        this.router = router;
    }
    ngOnInit() {
        this.ss.changeFalse();
        localStorage.removeItem('currentUser');
    }

    loginMethod() {
        localStorage.setItem('currentUser', JSON.stringify({}));
        this.toastyService.default({
            title: "Login Try!",
            msg: "Logging In....",
            showClose: true,
            timeout: 5000,
            theme: "material"
        });
        /*this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }*/
        this.ss.change();
        debugger;
        this.router.navigate(['/home']);

    }

}
