import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapRoutingModule } from './google-map-routing.module';
import { GoogleMapComponent } from './google-map.component';
import { NearbyPlacesComponent } from './components/nearby-places/nearby-places.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GoogleMapComponent,
    NearbyPlacesComponent
  ],
  imports: [
    CommonModule,
    GoogleMapRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ]
})
export class GoogleMapModule { }
