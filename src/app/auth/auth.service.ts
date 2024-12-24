import { Injectable } from '@angular/core';
import {WEB_TOKEN} from "../utils/constant";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;

  constructor() {
    this.token = localStorage.getItem(WEB_TOKEN);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public isAdmin(): boolean {
    const decodedToken = jwtDecode(this.token) as { roleCode: string };
    return decodedToken && decodedToken.roleCode === 'ADMIN';

  }
}
