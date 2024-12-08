import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Page404Component} from './page404/page404.component';
import {Page500Component} from './page500/page500.component';
import {OtpComponent} from "./otp/otp.component";
import {ButtonModule, CardModule, FormModule, GridModule} from '@coreui/angular';
import {IconModule} from '@coreui/icons-angular';
import {ReactiveFormsModule} from "@angular/forms";
import {NgOtpInputModule} from "ng-otp-input";
import {LaddaModule} from "angular2-ladda";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    OtpComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    LaddaModule.forRoot({
      style: "zoom-in",
      spinnerSize: 40,
      spinnerColor: "red",
      spinnerLines: 12
    })
  ]
})
export class PagesModule {
}
