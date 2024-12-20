import {Component, Input, OnInit} from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import {WEB_TOKEN} from "../../../utils/constant";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";
  isLogout: boolean = false;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.apiService.getUser()
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            sessionStorage.setItem('user-details', JSON.stringify(value?.content));
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
          this.router.navigateByUrl('/login');
        })
      )
      .subscribe()
  }
}
