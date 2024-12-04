import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getToken() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('webapp-token')}`,
    });
    return { headers: headers };
  }

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
    return this.http.post(url, null, this.getToken());
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
}
