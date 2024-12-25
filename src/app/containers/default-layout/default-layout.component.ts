import { Component } from '@angular/core';

import { navItems } from './_nav';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  constructor(
    private authService: AuthService,
  ) {
    this.filterNavItems();
  }

  private filterNavItems() {
    const isAdmin = this.authService.isAdmin(); // Check admin status
    this.navItems = this.navItems.filter(item =>
      isAdmin ? item.name !== 'Cards' : item.name !== 'Admin'
    );
  }
}
