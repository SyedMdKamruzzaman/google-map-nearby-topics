import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from './google-map.component';
import { NearbyPlacesComponent } from './components/nearby-places/nearby-places.component';

const routes: Routes = [
  {
    path: '',
    component: NearbyPlacesComponent,
    children: [
      {
        path: '',
        redirectTo: 'nearby-places',
        pathMatch: 'full',
      },
      {
        path: 'nearby-places',
        component: NearbyPlacesComponent,
        data: { returnUrl: window.location.pathname },
      },      
      { path: '', redirectTo: 'nearby-places', pathMatch: 'full' },
      { path: '**', redirectTo: 'nearby-places', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleMapRoutingModule { }
