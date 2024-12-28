import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {finalize} from "rxjs";
import {AppService} from "../../service/app.service";
import {cards} from "../../app-routing.module";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{

  loading: boolean = false;
  userStocks: any = Array(10).fill(null);
  currentPage: number = 0;
  totalPages: number = 1;
  visiblePages: number[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    // Read page number from URL
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] ? parseInt(params['page'], 10) : 0;
      this.getUserStock(this.currentPage);
    });
  }

  getUserStock(page: any){
    this.loading = true;
    this.userStocks = Array(10);
    this.appService.updateUrl(page, cards)
    this.apiService.getUserStock(page)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.userStocks = value?.content?.content;
            this.updateVisiblePages(value?.content);
          }
        },
        error: err => {}
      })
  }

  onClick() {
    this.router.navigateByUrl('/cards/more-details');
  }

  // Change page when clicking on pagination buttons
  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return; // Prevent going out of bounds
    }
    this.currentPage = page;
    this.getUserStock(page);
  }

  // Update the visible pages in the pagination to always show 3 pages
  updateVisiblePages(request: any): void {
    this.currentPage = request?.pageable?.pageNumber;
    this.totalPages = request?.totalPages;

    let startPage = this.currentPage - 1;  // Show the previous page
    let endPage = this.currentPage + 1;    // Show the next page

    // Ensure the first page is always shown as 1
    if (this.currentPage === 0) {
      startPage = 1;
      endPage = 2;
      this.visiblePages = [this.currentPage, startPage, endPage]
        .filter(page => page >= 0 && page < this.totalPages);
      return;
    }

    // Ensure the last page is within range
    else if (this.currentPage === this.totalPages - 1) {
      if (this.totalPages < 3 ){
        this.visiblePages = [0, 1];
        return;
      }
      endPage = this.totalPages - 1;
      startPage = Math.max(0, this.totalPages - 3);
    }

    // Ensure the page range is valid
    this.visiblePages = [startPage, this.currentPage, endPage]
      .filter(page => page >= 0 && page < this.totalPages);
  }
}
