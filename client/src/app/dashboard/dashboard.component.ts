import { Component } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent {
  title = 'app';
  login = false;
  loginMethod() {
    this.login = true;
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
  }
}
