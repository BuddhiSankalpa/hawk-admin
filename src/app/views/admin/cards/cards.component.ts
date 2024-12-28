import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {finalize} from "rxjs";
import {UpdateModalComponent} from "./update-modal/update-modal.component";
import {gold_plan_id, platinum_plan_id, silver_plan_id} from "../../../../environment/environment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  @ViewChild(UpdateModalComponent) updateModal!: UpdateModalComponent;
  @Output() loadingChange = new EventEmitter<boolean>();
  loading: boolean = false;
  loadingStates: { [key: string]: boolean } = {};
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
  currentPage: number = 0;
  totalPages: number = 2;
  visiblePages: number[] = [0,1];

  constructor(
    private apiService: ApiService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    // this.filterStocks({target: {value: 'all'}}, 0, true);
    this.userStocks = [
      {
        "id": "9e20425254e112421b7ce1102f0db5d2",
        "name": "Test 12",
        "description": "A high-performing agri company stock",
        "stopLoss": 150.00,
        "maxGain": 400.50,
        "buyTarget": 360.00,
        "sellTarget": 150.00,
        "buyZone": 160.00,
        "imageUrl": null,
        "createdDate": "2024-12-27T21:52:08.539202",
        "planStocks": []
      }
    ]
  }

  openModal(stock: any) {
    this.updateModal.stock = stock;
    this.updateModal.open();
  }

  filterStocks(event: any, page: any, isFilter: boolean) {
    this.loading = true;
    this.loadingChange.emit(this.loading); // Emit loading state
    this.userStocks = Array(10).fill(null);
    let selectedValue: any;
    if (isFilter){
      selectedValue = event?.target?.value;
    } else {
      selectedValue = event
    }

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

    this.apiService.filterStocks(unassigned, planId, page)
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
            this.currentPage = value?.content?.pageable?.pageNumber;
            this.totalPages = value?.content?.totalPages;
            this.updateVisiblePages()
          }
        },
        error: err => {

        }
      });
  }

  assignToPlan(event: Event, planId: any, stock: any, isUnassigned: boolean) {
    event.stopPropagation();
    const key = `${planId}_${stock.id}`;
    this.loadingStates[key] = true;

    let updateStock = this.userStocks.find((mainStock: any) => stock.id === mainStock.id);
    if (!isUnassigned) {
      this.apiService.assignSock(planId, stock.id)
        .pipe(
          finalize(() =>  this.loadingStates[key] = false)
        )
        .subscribe({
          next: value => {
            if (value?.statusCode === 200) {
              // this.filterStocks({ target: { value: 'all' } });
              this.toaster.success('Assigned plan successfully!');
              if (planId === silver_plan_id) {
                updateStock.planStocks.push({
                  plan: {
                    id: silver_plan_id,
                    name: 'Silver'
                  }
                });
              } else if (planId === gold_plan_id) {
                updateStock.planStocks.push({
                  plan: {
                    id: gold_plan_id,
                    name: 'Gold'
                  }
                });
              } else if (planId === platinum_plan_id) {
                updateStock.planStocks.push({
                  plan: {
                    id: platinum_plan_id,
                    name: 'Platinum'
                  }
                });
              }
            }
            else this.toaster.error('Assign plan failed. Try again!');
          },
          error: err => {
            this.toaster.error('Assign plan failed. Try again!');
          }
        })

    } else {
      this.apiService.unassignSock(planId, stock.id)
        .pipe(
          finalize(() =>  this.loadingStates[key] = false)
        )
        .subscribe({
          next: value => {
            if (value?.statusCode === 200) {
              this.toaster.success('Unassigned plan successfully!');
              updateStock.planStocks = updateStock.planStocks
                .filter((planStock: any) => planStock.plan.id !== planId);
            } else {
              this.toaster.error('Unassign plan failed. Try again!');
            }
          },
          error: err => {
            this.toaster.error('Unassign plan failed. Try again!');
          }
        })
    }
  }

  isSilver(plan: any): boolean {
    return plan.some((plan: { plan: { name: string; }; }) => plan.plan.name === 'Silver');
  }

  isGold(plan: any): boolean {
    return plan.some((plan: { plan: { name: string; }; }) => plan.plan.name === 'Gold');
  }

  isPlatinum(plan: any): boolean {
    return plan.some((plan: { plan: { name: string; }; }) => plan.plan.name === 'Platinum');
  }

  getLoadingState(planId: string, stockId: string): boolean {
    const key = `${planId}_${stockId}`;
    return this.loadingStates[key] || false;
  }

  // Change page when clicking on pagination buttons
  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return; // Prevent going out of bounds
    }
    this.currentPage = page;
    this.filterStocks(this.planName, page, false); // Fetch the new page data
  }

  // Update the visible pages in the pagination to always show 3 pages
  updateVisiblePages(): void {
    let startPage = this.currentPage - 1;  // Show the previous page
    let endPage = this.currentPage + 1;    // Show the next page

    // Ensure the first page is always shown as 1
    if (this.currentPage === 0) {
      startPage = 1;
      endPage = 2;
      this.visiblePages = [this.currentPage, startPage, endPage].filter(page => page >= 0 && page < this.totalPages);
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
    this.visiblePages = [startPage, this.currentPage, endPage].filter(page => page >= 0 && page < this.totalPages);
  }
  protected readonly silver_plan_id = silver_plan_id;
  protected readonly gold_plan_id = gold_plan_id;
  protected readonly platinum_plan_id = platinum_plan_id;
}
