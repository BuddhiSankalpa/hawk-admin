import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')])
  },{
    validator: this.passwordMatchValidator
  });
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
    this.registerForm.get('phoneNo')?.setValue(input.value, { emitEvent: false });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, country, city, email, password, phoneNo } = this.registerForm.value;
      const formData = {
        email,
        password,
        userInfo: {
          firstName,
          lastName,
          phoneNo,
          country,
          city
        }
      }
      this.apiService.signup(formData)
        .subscribe({
          next: value => {
            if (value && value.statusCode === 200) {
              this.toastr.success('OTP sent to email');
              const id = value?.content?.id;
              this.router.navigate([`/otp/${id}`]);
            } else {
              this.toastr.error("Registration failed. Please try again!");
            }
          },
          error: err => this.toastr.error("Registration failed. Please try again!")
        });
    }
  }
}
