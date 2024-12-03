import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {AppService} from "../service/app.service";

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const mainServ = inject(AppService);

    if (!auth.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
    if (!mainServ.loggedUser){
      const user = sessionStorage.getItem('webapp-user');
      mainServ.loggedUser = user ? JSON.parse(atob(user)) : null;
    }

    return true;
};
