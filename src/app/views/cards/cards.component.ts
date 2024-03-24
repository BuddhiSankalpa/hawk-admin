import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  array = [1,2,3,4,5]

  constructor(private router: Router) {
  }


  onClick() {
    this.router.navigate(['/cards/more-details'])
  }
}
