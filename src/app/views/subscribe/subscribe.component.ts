import {Component, OnInit} from '@angular/core';
import {pricing_table_id, publishable_key} from "../../../environment/environment";
import {ApiService} from "../../service/api.service";
import {finalize} from "rxjs";
import {cilCheckCircle} from "@coreui/icons";
import {ToastrService} from "ngx-toastr";
import {WEB_USER} from "../../utils/constant";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent implements OnInit {
  protected readonly cilCheckCircle = cilCheckCircle;

  // use for frontend strip frontend integration
  pricingTableId: string = pricing_table_id;
  publishableKey: string = publishable_key;

  loading: boolean = true;
  isSubscribing: Record<string, boolean> = {};
  subDetails: any = [1,2,3];
  packageId: any;
  packageDetails: any = {
    "silver": [
      "No adds",
      "Custom timeframes",
      "Custom Range Bars",
      "Volume profile",
      "Multiple watchlist",
      "Bar replay",
      "Indicators on indicators"
    ],
    "gold": [
      "No adds",
      "Custom timeframes",
      "Custom Range Bars",
      "Volume profile",
      "Multiple watchlist",
      "Bar replay",
      "Indicators on indicators",
      "Volume profile"
    ],
    "platinum" : [
      "No adds",
      "Custom timeframes",
      "Custom Range Bars",
      "Volume profile",
      "Multiple watchlist",
      "Bar replay",
      "Indicators on indicators",
      "Custom Range Bars",
      "Indicators on indicators"
    ]
  }

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem(WEB_USER);
    if (user) {
      this.packageId = JSON.parse(user).plan
    }

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
          } else this.toastr.error("Error loading. Please try again!")
        },
        error:() => {
          this.toastr.error("Error loading. Please try again!")
        }
      })
  }

  getPackageDetails(planName: string) {
    return this.packageDetails[planName.toLowerCase()];
  }

  activateSubscriptionPlan(id: any) {
    this.isSubscribing[id] = true;
    this.apiService.getStripeRedirectUrl(id)
      .pipe(
        finalize(()=> this.isSubscribing[id] = false)
      )
      .subscribe({
        next: redirectUrl => {
          window.location.href = redirectUrl;
        },
        error: err => {
          this.toastr.error('Something went wrong while processing the subscription!');
        }
      })
  }
}
