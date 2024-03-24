import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage, NgStyle} from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import {
  CardBodyComponent,
  CardComponent,
  CardImgDirective, CardTextDirective, CardTitleDirective,
  ColComponent,
  ColDirective,
  RowComponent
} from "@coreui/angular";
import {CardsComponent} from "./cards.component";
import {MoreDetailsComponent} from "./more-details/more-details.component";


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    CardComponent,
    RowComponent,
    CardBodyComponent,
    ColDirective,
    CardImgDirective,
    ColComponent,
    NgStyle,
    CardTextDirective,
    CardTitleDirective,
    CardComponent,
    NgOptimizedImage,
    MoreDetailsComponent
  ]
})
export class CardsModule { }
