import {Component} from '@angular/core';
import { pricing_table_id, publishable_key } from "../../../environment/environment";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  pricingTableId: string = pricing_table_id;
  publishableKey: string = publishable_key;
}
