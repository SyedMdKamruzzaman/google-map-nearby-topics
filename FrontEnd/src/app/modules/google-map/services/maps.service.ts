import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { MapModel } from '../models/map-model';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private httpClient: HttpClient) { }

  getNearbyPlacesList(mapModel:MapModel) {
    const formData = new FormData();
    formData.append("Topic",mapModel.topic);
    formData.append("Address",mapModel.address);
    formData.append("Distance",mapModel.distance.toString());      
    return this.httpClient.post(UrlConstants.getNearbyPlacesList, formData);
  }
}
