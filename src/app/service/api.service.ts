import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(email: any, password: any): Observable<any>{
    const url = `${baseUrl}/auth/login`;
    const body: object = {
      password,
      email
    };
    return this.http.post(url, body);
  }

  logOut(): Observable<any> {
    const url = `${baseUrl}/auth/logout`;
    return this.http.post(url, null);
  }

  signup(formData: any): Observable<any> {
    const url = `${baseUrl}/register/signup`;
    return this.http.post(url, formData);
  }

  verifyOtp(formData: any, id: any): Observable<any> {
    const url = `${baseUrl}/register/verify-otp/${id}`;
    return this.http.put(url, formData);
  }

  resendOtp(id: any): Observable<any> {
    const url = `${baseUrl}/register/resend-otp/${id}`;
    return this.http.put(url, null);
  }

  forgetPassword(formData: any): Observable<any> {
    const url = `${baseUrl}/reset/forget-password`;
    return this.http.put(url, formData);
  }

  resetPassword(formData: any, id: any): Observable<any> {
    const url = `${baseUrl}/reset/reset-password/${id}`;
    return this.http.put(url, formData);
  }

  getSubscriptionPlan(): Observable<any> {
    const url = `${baseUrl}/plan/all`;
    return this.http.get(url);
  }
}
