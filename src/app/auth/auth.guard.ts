import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {AppService} from "../service/app.service";
import {WEB_USER} from "../utils/constant";

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const mainServ = inject(AppService);

    if (!auth.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
    if (!mainServ.loggedUser){
      const user = localStorage.getItem(WEB_USER);
      mainServ.loggedUser = user ? JSON.parse(atob(user)) : null;
    }
    return true;
};
