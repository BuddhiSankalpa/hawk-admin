import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscribeComponent} from "./subscribe.component";
import {SubscribeRoutingModule} from "./subscribe-routing.module";



@NgModule({
  declarations: [SubscribeComponent],
  imports: [
    CommonModule,
    SubscribeRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubscribeModule { }
