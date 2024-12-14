import { Injectable } from '@angular/core';
import {WEB_TOKEN} from "../utils/constant";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(WEB_TOKEN);
  }
}
