import { Component } from '@angular/core';
import {TableDirective} from "@coreui/angular";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    TableDirective,
    CurrencyPipe
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss'
})
export class AnalysisComponent {

}
