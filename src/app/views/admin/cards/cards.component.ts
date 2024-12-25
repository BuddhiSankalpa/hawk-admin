import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  @Output() loadingChange = new EventEmitter<boolean>();
  loading: boolean = true;
  userStocks: any = Array(10).fill(null);
  plans: any = [
    {
      id: 'ef8694bef9b17e80387030b9a98aabe2',
      name: 'silver'
    },
    {
      id: 'cf42336ada883ec8168b4c346ad24487',
      name: 'gold'
    },
    {
      id: '32946927ec96fc23cf90acd305fc493d',
      name: 'platinum'
    }
  ];
  planName: any;

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.filterStocks({ target: { value: 'all' } });

    // this.userStocks =  [
    //   {
    //     "id": "32946927ec96fc23cf90acd305fc493d",
    //     "name": "Test",
    //     "description": "A high-performing agri company stock",
    //     "stopLoss": 150.00,
    //     "maxGain": 400.50,
    //     "buyTarget": 360.00,
    //     "sellTarget": 150.00,
    //     "buyZone": 160.00,
    //     "imageUrl": null,
    //     "createdDate": "2024-12-25T05:19:00.740202",
    //     "planStocks": []
    //   },
    //   {
    //     "id": "cf42336ada883ec8168b4c346ad24487",
    //     "name": "AgriStock",
    //     "description": "A high-performing agri company stock",
    //     "stopLoss": 150.00,
    //     "maxGain": 400.50,
    //     "buyTarget": 360.00,
    //     "sellTarget": 150.00,
    //     "buyZone": 160.00,
    //     "imageUrl": null,
    //     "createdDate": "2024-12-15T09:43:10.339863",
    //     "planStocks": [
    //       {
    //         "plan": {
    //           "id": "ef8694bef9b17e80387030b9a98aabe2",
    //           "name": "Silver"
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "ef8694bef9b17e80387030b9a98aabe2",
    //     "name": "TechStock",
    //     "description": "A high-performing tech company stock",
    //     "stopLoss": 150.25,
    //     "maxGain": 200.50,
    //     "buyTarget": 160.00,
    //     "sellTarget": 190.00,
    //     "buyZone": 155.00,
    //     "imageUrl": null,
    //     "createdDate": "2024-12-15T09:41:13.493596",
    //     "planStocks": [
    //       {
    //         "plan": {
    //           "id": "ef8694bef9b17e80387030b9a98aabe2",
    //           "name": "Silver"
    //         },
    //         "plan2": {
    //           "id": "ef8694bef9b17e80387030b9a98aabe2",
    //           "name": "Gold"
    //         }
    //       }
    //     ]
    //   }
    // ];

  }

  openModal(stock: any) {
    this.updateModal.stock = stock;
    this.updateModal.open();
  }

  filterStocks(event: any) {
    this.loading = true;
    this.loadingChange.emit(this.loading); // Emit loading state
    this.userStocks = Array(10).fill(null);
    const selectedValue: any = event?.target?.value;

    let unassigned: boolean | undefined = undefined;
    let planId: string | undefined = undefined;

    if (selectedValue === 'all') {
      // All stocks, no filters
    } else if (selectedValue === 'unassigned') {
      unassigned = true;
      this.planName = selectedValue;
    } else {
      planId = this.plans.find((plan: { name: string }) => plan.name === selectedValue)?.id;
      this.planName = selectedValue;
    }

    this.apiService.filterStocks(unassigned, planId)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loadingChange.emit(this.loading); // Emit loading state
        })
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.userStocks = value?.content?.content;
          }
        },
        error: err => {

        }
      });
  }

  getKeys(object: any): string[] {
    return Object.keys(object).filter(key => typeof object[key] === 'object' && object[key]?.name);
  }

  unassignStock(event: MouseEvent, id: any) {
    event.stopPropagation();
  }
}
