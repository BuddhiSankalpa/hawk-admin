import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidationFormsService} from "../../../service/validation-forms.service";
import {PasswordValidators} from "../../../service/validators";
import {finalize} from "rxjs";
import {AppService} from "../../../service/app.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  isSubmit: boolean = false;
  formErrors: any;
  formControls!: string[];
  restPasswordForm!: FormGroup;
  id: any;
  email: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    public validationFormsService: ValidationFormsService
  ) {
    this.formErrors = this.validationFormsService.errorMessages;
    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const resetData = this.appService.getResetData();
    if (!resetData || !resetData.email || resetData.id !== this.id) {
      console.log(this.id)
      console.log(resetData?.id)
      this.router.navigate(['/reset-password-step1']);
    } else {
      this.email = resetData.email;
    }
  }

  createForm() {
    this.restPasswordForm = this.formBuilder.group(
      {
        tempPassword: ['', [Validators.required]],
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
        ]
      },
      { validators: [PasswordValidators.confirmPassword] }
    );
    this.formControls = Object.keys(this.restPasswordForm.controls);
  }

  resetPasswordFormSubmit() {
    this.isSubmit = true;
    const { tempPassword, password: newPassword } = this.restPasswordForm.value;
    const formData = {
      tempPassword,
      newPassword,
      email: this.email
    }
    this.apiService.resetPassword(formData, this.id)
      .pipe(
        finalize(() => {
          this.isSubmit = false
        })
      )
      .subscribe({
        next: value => {
          if (value && value?.statusCode === 200) {
            this.appService.clearResetData();
            this.toastr.success("Password reset success!");
            this.router.navigateByUrl("/login");
          } else {
            this.toastr.error("Password reset failed. Please try again!");
          }
        },
        error: err => {
          console.log(err)
          if (err?.error?.statusCode === 417) {
            if (err.error?.validationFailure?.message === 'tempPassword.invalid'){
              this.toastr.error("Temporary password is invalid!");
            } else if (err.error?.validationFailure?.message === 'user.invalid') {
              this.toastr.error("Invalid email address!");
            } else if (err.error?.validationFailure?.message === 'user.doesnt.exist') {
              this.toastr.error("Provided email is not registered")
            } else {
              this.toastr.error("Password reset failed. Please try again!")
            }
          }
        }
      })
  }
}
