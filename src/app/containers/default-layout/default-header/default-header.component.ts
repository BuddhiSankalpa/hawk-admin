import {Component, Input, OnInit} from '@angular/core';

import {HeaderComponent} from '@coreui/angular';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import {WEB_TOKEN, WEB_USER} from "../../../utils/constant";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  isLogout: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.apiService.getUser()
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            sessionStorage.setItem(WEB_USER, JSON.stringify(value?.content));
          }
        }
      })
  }

  logout() {
    this.isLogout = true;
    this.apiService.logOut()
      .pipe(
        finalize(() => {
          this.isLogout = false;
          localStorage.removeItem(WEB_TOKEN);
          localStorage.removeItem(WEB_USER);
          this.router.navigateByUrl('/login');
        })
      )
      .subscribe()
  }
}
