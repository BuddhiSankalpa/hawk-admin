import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{

  loading: boolean = true;
  userStocks: any = Array(10).fill(null);

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getUserStock()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.userStocks = value?.content?.content;
          }
        },
        error: err => {}
      })
  }

  onClick() {
    this.router.navigate(['/cards/more-details'])
  }
}
