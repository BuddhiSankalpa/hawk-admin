import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscribeComponent} from "./subscribe.component";
import {SubscribeRoutingModule} from "./subscribe-routing.module";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardImgDirective, CardTextDirective, CardTitleDirective,
  ColComponent,
  GutterDirective,
  RowComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {LaddaModule} from "angular2-ladda";



@NgModule({
  declarations: [SubscribeComponent],
  imports: [
    CommonModule,
    SubscribeRoutingModule,
    ColComponent,
    RowComponent,
    CardComponent,
    CardBodyComponent,
    GutterDirective,
    CardImgDirective,
    CardTitleDirective,
    CardTextDirective,
    ButtonDirective,
    IconDirective,
    LaddaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubscribeModule { }
