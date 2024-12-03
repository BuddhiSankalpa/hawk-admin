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
      Authorization: `Bearer ${sessionStorage.getItem('webapp-token')}`,
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
    console.log(this.getToken());
    return this.http.post(url, null, this.getToken());
  }
}
