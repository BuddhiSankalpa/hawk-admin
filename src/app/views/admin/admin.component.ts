import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CardsComponent} from "./cards/cards.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, AfterViewInit{
  @ViewChild(CardsComponent) cardComponent!: CardsComponent;
  activeTab: number = 0;
  isFiltering: boolean = true;
  stockSelection: string = 'all';

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the 'stockSelection' parameter from the URL
    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        this.stockSelection = params['filter'];
      }
    });
  }

  ngAfterViewInit() {
    // Subscribe to loading changes
    this.cardComponent.loadingChange.subscribe((isLoading: boolean) => {
      this.isFiltering = isLoading;
      this.cdRef.detectChanges(); // Trigger change detection
    });
  }

  onFilterChange(event: any) {
    this.cardComponent.filterStocks(event, 0, true)
  }
}
