import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';

import {sharedService} from './services/sharedService';
import {AuthGuard} from './services/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: "/login",
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        component: LogoutComponent,canActivate: [AuthGuard]
      },
    ]),ToastyModule.forRoot()
  ],
  providers: [sharedService,AuthGuard,ToastyModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
