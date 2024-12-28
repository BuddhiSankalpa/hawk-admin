import {Component, OnInit} from '@angular/core';
import {navItems} from './_nav';
import {AuthService} from "../../auth/auth.service";
import {INavData} from "@coreui/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent{

  public navItems: INavData[] = navItems;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let page;
    let filter;
    this.route.queryParams.subscribe((params) => {
      page = params['page'] ? parseInt(params['page'], 10) : 0;
      filter = params['filter'] ? params['filter'] : 'all';
    });
    this.filterNavItems(page, filter);
  }

  filterNavItems(page: any, filter: any) {
    const isAdmin = this.authService.isAdmin(); // Check admin status
    this.navItems = this.navItems
      .filter(item => isAdmin ? item.name !== 'Cards' : item.name !== 'Admin');
    if (isAdmin) {
      this.router.navigate(['/admin'], { queryParams: { page: page, filter: filter } })
    } else {
      this.router.navigate(['/cards'])
    }
  }
}
