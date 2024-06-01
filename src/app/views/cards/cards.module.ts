import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage, NgStyle} from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import {
  CardBodyComponent,
  CardComponent,
  CardImgDirective, CardTextDirective, CardTitleDirective,
  ColComponent,
  ColDirective, NavComponent, NavLinkDirective,
  RowComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular";
import {CardsComponent} from "./cards.component";
import {MoreDetailsComponent} from "./more-details/more-details.component";
import {RouterLink} from "@angular/router";
import {AnalysisComponent} from "./analysis/analysis.component";


@NgModule({
  declarations: [
    CardsComponent,
    MoreDetailsComponent
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
    NavComponent,
    NavLinkDirective,
    TabContentRefDirective,
    RouterLink,
    TabContentComponent,
    TabPaneComponent,
    AnalysisComponent
  ]
})
export class CardsModule { }
