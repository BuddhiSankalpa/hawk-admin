import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../service/api.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    private router: Router
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
            this.router.navigateByUrl(`/otp/${id}`)
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
