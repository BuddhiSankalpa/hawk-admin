import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {finalize} from "rxjs";
import {UpdateModalComponent} from "./update-modal/update-modal.component";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  @ViewChild(UpdateModalComponent) updateModal!: UpdateModalComponent;
  loading: boolean = true;
  userStocks: any = Array(10).fill(null);

  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.apiService.getAllStock()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.userStocks = value?.content?.content;
          }
        },
        error: err => {
        }
      })
  }

  openModal(stock: any) {
    this.updateModal.stock = stock;
    this.updateModal.open();
  }

}
