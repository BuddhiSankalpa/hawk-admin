import {Component, OnInit} from '@angular/core';
import {pricing_table_id, publishable_key} from "../../../environment/environment";
import {ApiService} from "../../service/api.service";
import {finalize} from "rxjs";
import {cilCheckCircle} from "@coreui/icons";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent implements OnInit {
  pricingTableId: string = pricing_table_id;
  publishableKey: string = publishable_key;

  loading: boolean = true;
  subDetails: any = [1,2,3];
  packageDetails: any = {
    "silver": [
      "No adds",
      "Custom timeframes",
      "Custom Range Bars",
      "Volume profile",
      "Multiple watchlists",
      "Bar replay",
      "Indicators on indicators"
    ],
    "gold": [
      "No adds",
      "Custom timeframes",
      "Custom Range Bars",
      "Volume profile",
      "Multiple watchlists",
      "Bar replay",
      "Indicators on indicators",
      "Volume profile"
    ],
    "platinum" : [
      "No adds",
      "Custom timeframes",
      "Custom Range Bars",
      "Volume profile",
      "Multiple watchlists",
      "Bar replay",
      "Indicators on indicators",
      "Custom Range Bars",
      "Indicators on indicators"
    ]
  }

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getSubscriptionPlan()
      .pipe(
        finalize(()=>{
          this.loading = false;
        })
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.subDetails = value?.content;
          }
        },
        error: err => {
          console.log("error sub: " + err)
        }
      })
  }

  getPackageDetails(planName: string) {
    return this.packageDetails[planName.toLowerCase()];
  }

  protected readonly cilCheckCircle = cilCheckCircle;
}
