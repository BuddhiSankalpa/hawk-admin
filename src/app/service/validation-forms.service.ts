import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    mobileNumberMin: 10,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    tempPassword: '',
    country: '',
    city: ''
  };

  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'First name is required'
      },
      lastName: {
        required: 'Last name is required'
      },
      phoneNo: {
        required: 'Mobile number is required',
        minLength: `Mobile number must contain  ${this.formRules.mobileNumberMin} numbers`
      },
      email: {
        required: 'Email is required',
        email: 'Invalid email address'
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      tempPassword: {
        required: 'Temporary password is required'
      },
      country: {
        required: 'Country required'
      },
      city: {
        required: 'City required'
      }
    };
  }
}
