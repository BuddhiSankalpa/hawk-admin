import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CardsComponent} from "./cards/cards.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements AfterViewInit{
  @ViewChild(CardsComponent) cardComponent!: CardsComponent;
  activeTab: number = 0;
  isFiltering: boolean = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // Subscribe to loading changes
    this.cardComponent.loadingChange.subscribe((isLoading: boolean) => {
      this.isFiltering = isLoading;
      this.cdRef.detectChanges(); // Trigger change detection
    });
  }

  onFilterChange(event: any) {
    this.cardComponent.filterStocks(event)
  }
}
