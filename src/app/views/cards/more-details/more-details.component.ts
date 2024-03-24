import { Component } from '@angular/core';
import {
  NavComponent,
  NavLinkDirective,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent
} from "@coreui/angular";
import {RouterLink} from "@angular/router";
import {AnalysisComponent} from "../analysis/analysis.component";

@Component({
  selector: 'app-more-details',
  standalone: true,
  imports: [
    NavComponent,
    NavLinkDirective,
    TabContentRefDirective,
    RouterLink,
    TabContentComponent,
    TabPaneComponent,
    AnalysisComponent
  ],
  templateUrl: './more-details.component.html',
  styleUrl: './more-details.component.scss'
})
export class MoreDetailsComponent {

}
