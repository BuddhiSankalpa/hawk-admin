import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CardsComponent} from "./cards.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cards',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'card',
      },
      {
        path: 'card',
        component: CardsComponent,
        data: {
          title: 'Card',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
