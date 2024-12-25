import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {
  ButtonCloseDirective, ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardImgDirective,
  ColComponent,
  ColDirective,
  DropdownComponent, FormControlDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, ModalBodyComponent,
  ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent
} from "@coreui/angular";
import {AnalysisComponent} from "../cards/analysis/analysis.component";
import {CardsComponent} from "./cards/cards.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LaddaModule} from "angular2-ladda";
import { UpdateModalComponent } from './cards/update-modal/update-modal.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import {IconDirective} from "@coreui/icons-angular";



@NgModule({
  declarations: [
    AdminComponent,
    CardsComponent,
    UpdateModalComponent,
    CreateStockComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    ColDirective,
    RowComponent,
    CardImgDirective,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    DropdownComponent,
    AnalysisComponent,
    TabPaneComponent,
    TabContentComponent,
    TabContentRefDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalToggleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonCloseDirective,
    ButtonDirective,
    ModalTitleDirective,
    FormControlDirective,
    FormDirective,
    FormFeedbackComponent,
    FormLabelDirective,
    ReactiveFormsModule,
    LaddaModule,
    IconDirective
  ]
})
export class AdminModule { }
