import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SubscribeComponent} from "./subscribe.component";

const routes: Routes = [
  {
    path: '',
    component: SubscribeComponent,
    data: {
      title: 'Subscribe',
    },
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'subscribe',
    //   },
    //   {
    //     path: 'subscribe',
    //     component: SubscribeComponent,
    //     data: {
    //       title: 'Subscription',
    //     }
    //   }
    // ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribeRoutingModule { }
