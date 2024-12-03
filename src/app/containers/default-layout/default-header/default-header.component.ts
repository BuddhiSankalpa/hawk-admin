import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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
      .subscribe({
        complete: () => {
          localStorage.removeItem('webapp-token');
          this.router.navigate(['/login']);
        }
      })
  }
}
