import {Component} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {WEB_TOKEN} from "../../../utils/constant";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLogin: boolean = false;
  loginForm: FormGroup;
  type = 'password';

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.isLogin = true;
    this.apiService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(
        finalize(() => {
          this.isLogin = false;
        })
      )
      .subscribe({
        next: res => {
          if (res) {
            const msg = res.message;
            if (res.status) {
              this.toastr.success("Login Successful!");
              localStorage.setItem(WEB_TOKEN, res.content.accessToken);
              // const decodedToken = jwtDecode(res.content.accessToken) as { roleCode: string };
              // if (decodedToken && decodedToken.roleCode === 'ADMIN') {
              //   window.location.href = '/admin';
              // } else {
              //   window.location.href = '/cards';
              // }
              window.location.href = '';
            } else {
              this.toastr.error('Login Failed!')
            }
          }
        },
        error: err => {
          if (err?.error?.statusCode === 417) {
            if (err.error?.validationFailure === 'user.doesnt.exist') {
              this.toastr.error('Invalid email!')
            } else if (err.error?.validationFailure === 'password.incorrect') {
              this.toastr.error('Invalid password!')
            }
          }
          this.toastr.error('Login Failed!')
        }
      })
  }

  showPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
