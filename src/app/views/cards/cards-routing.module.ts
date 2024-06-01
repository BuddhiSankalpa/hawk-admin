import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CardsComponent} from "./cards.component";
import {MoreDetailsComponent} from "./more-details/more-details.component";

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
        redirectTo: '',
      },
      {
        path: '',
        component: CardsComponent,
        data: {
          title: '',
        }
      },
      {
        path: 'more-details',
        component: MoreDetailsComponent,
        data: {
          title: 'More-Details'
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
