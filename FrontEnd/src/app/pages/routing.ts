import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'google-map',
    loadChildren: () =>
      import('../modules/google-map/google-map.module').then((m) => m.GoogleMapModule),
  },
  {
    path: '',
    redirectTo: '/google-map',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
