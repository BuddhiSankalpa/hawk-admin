import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getStripeRedirectUrl(id: any): Observable<any> {
    const url = `${baseUrl}/plan/${id}/subscribe`;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getUserStock(page: any): Observable<any> {
    const url = `${baseUrl}/user-stock/all?page=${page}`;
    return this.http.get(url);
  }

  getUser(): Observable<any> {
    const url = `${baseUrl}/auth/user-profile`;
    return this.http.get(url);
  }

  filterStocks(unassigned?: boolean, planId?: string, page?: any): Observable<any> {
    let params = new HttpParams();
    if (unassigned !== undefined) {
      params = params.set('unassigned', unassigned.toString());
    }
    if (planId) {
      params = params.set('planId', planId);
    }
    const url = `${baseUrl}/stock/all?page=${page}`;
    return this.http.get(url, { params });
  }


  createStock(formData: any): Observable<any> {
    const url = `${baseUrl}/stock`;
    return this.http.post(url, formData);
  }

  updateStock(formData: any, id: any): Observable<any> {
    const url = `${baseUrl}/stock/${id}`;
    return this.http.put(url, formData);
  }

  assignSock(planId: any, stockId: any): Observable<any> {
    const url = `${baseUrl}/plan-stock/assign/${planId}/${stockId}`;
    return this.http.put(url, null);
  }

  unassignSock(planId: any, stockId: any): Observable<any> {
    const url = `${baseUrl}/plan-stock/unassign/${planId}/${stockId}`;
    return this.http.put(url, null);
  }
}
