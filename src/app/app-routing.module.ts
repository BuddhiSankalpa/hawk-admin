import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {Page404Component} from './views/pages/page404/page404.component';
import {Page500Component} from './views/pages/page500/page500.component';
import {LoginComponent} from './views/pages/login/login.component';
import {RegisterComponent} from './views/pages/register/register.component';
import {authGuard} from "./auth/auth.guard";
import {OtpComponent} from "./views/pages/otp/otp.component";
import {ForgetPasswordComponent} from "./views/pages/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./views/pages/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./views/cards/cards.module').then((m) => m.CardsModule)
      },
      {
        path: 'subscribe',
        loadChildren: () =>
          import('./views/subscribe/subscribe.module').then((m) => m.SubscribeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'otp/:id',
    component: OtpComponent,
    data: {
      title: 'Otp Page'
    }
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    data: {
      title: 'Forget Password Page'
    }
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
