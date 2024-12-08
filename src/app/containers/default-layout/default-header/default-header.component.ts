import { Component, Input } from '@angular/core';

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
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

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

  logout() {
    this.apiService.logOut()
      .pipe(
        finalize(() => {
          localStorage.removeItem(WEB_TOKEN);
          this.router.navigateByUrl('/login');
        })
      )
      .subscribe()
  }
}
