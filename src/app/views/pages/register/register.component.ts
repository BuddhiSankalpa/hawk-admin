import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ValidationFormsService} from "../../../service/validation-forms.service";
import {PasswordValidators} from "../../../service/validators";
import {finalize} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formErrors: any;
  formControls!: string[];
  submitted: boolean = false;
  registerForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    public validationFormsService: ValidationFormsService
  ) {
    this.formErrors = this.validationFormsService.errorMessages;
    this.createForm()
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
    this.registerForm.get('phoneNo')?.setValue(input.value, { emitEvent: false });
  }

  createForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNo: [
          '',
          [
            Validators.required,
            Validators.minLength(this.validationFormsService.formRules.mobileNumberMin),
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.validationFormsService.formRules.passwordMin),
            Validators.pattern(this.validationFormsService.formRules.passwordPattern)
          ]
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(this.validationFormsService.formRules.passwordMin),
            Validators.pattern(this.validationFormsService.formRules.passwordPattern)
          ]
        ],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]]
      },
      { validators: [PasswordValidators.confirmPassword] }
    );
    this.formControls = Object.keys(this.registerForm.controls);
  }

  register() {
    if (this.registerForm.valid) {
      this.submitted = true;
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
        .pipe(
          finalize(() => {
            this.submitted = false;
          })
        )
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
          error: err => {
            if (err.error?.statusCode === 417) {
              if (err?.error?.validationFailure?.message === 'email.already.exist') {
                this.toastr.error("Email already exist");
              }
            } else {
              this.toastr.error("Registration failed. Please try again!")
            }
          }
        });
    }
  }
}
