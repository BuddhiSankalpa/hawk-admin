import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import {WEB_TOKEN} from "../utils/constant";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastrService);

  const token = localStorage.getItem(WEB_TOKEN);

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedReq).pipe(
      tap({
        error: (err) => {
          console.log("AUTH ERROR: " + err)
          if (err?.error?.status === 403) {
            toast.warning('Session Expired!');
            localStorage.clear();
            router.navigateByUrl('/login');
          }
        }
      })
    );
  }
  return next(req);
};

