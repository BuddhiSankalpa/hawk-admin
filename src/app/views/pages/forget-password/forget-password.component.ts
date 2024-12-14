import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../service/api.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../service/app.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  isSend: boolean = false;
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService
  ) {
  }

  forgetPasswordFormSubmit() {
    this.isSend = true;
    this.apiService.forgetPassword(this.forgetPasswordForm.value)
      .pipe(
        finalize(() => {
          this.isSend = false;
        })
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200){
            const id = value?.content?.id;
            this.appService.setResetData(this.forgetPasswordForm.get('email')?.value,id);
            this.router.navigateByUrl(`/reset-password/${id}`)
          } else {
            this.toastr.error("Registration failed. Please try again!");
          }
        },
        error: err => {
          console.log(err)
          if (err?.error?.statusCode === 417) {
            this.toastr.error("Invalid email address!");
          }
        }
      })
  }

}
