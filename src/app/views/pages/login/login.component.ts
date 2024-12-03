import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', Validators.required),
    // });
  }

  login() {
    this.apiService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: res => {
          if (res) {
            const msg = res.message;
            if (res.status) {
              this.toastr.success("Login Successful!");

              // this.mainServ.loggedUser = JSON.parse(atob(res.user));

              // sessionStorage.setItem('webapp-user', res.user);
              localStorage.setItem('webapp-token', res.content.accessToken);

              this.router.navigateByUrl('/portal');
            } else {
              this.toastr.error(msg);
            }
          }
        },
        error: err => this.toastr.error('Login Failed!')
      })
  }

}
