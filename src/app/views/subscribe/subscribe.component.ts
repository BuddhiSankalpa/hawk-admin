import {Component} from '@angular/core';
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  pricingTableId: string = environment.pricing_table_id;
  publishableKey: string = environment.publishable_key;
}
