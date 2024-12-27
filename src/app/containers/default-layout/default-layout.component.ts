import {Component, OnInit} from '@angular/core';
import {navItems} from './_nav';
import {AuthService} from "../../auth/auth.service";
import {INavData} from "@coreui/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent{

  public navItems: INavData[] = navItems;

  constructor(
    private authService: AuthService,
    private roter: Router
  ) {
    this.filterNavItems();
  }

  filterNavItems() {
    const isAdmin = this.authService.isAdmin(); // Check admin status
    this.navItems = this.navItems
      .filter(item => isAdmin ? item.name !== 'Cards' : item.name !== 'Admin');
    if (isAdmin) {
      this.roter.navigateByUrl('/admin')
    } else {
      this.roter.navigateByUrl('/cards')
    }
  }
}
