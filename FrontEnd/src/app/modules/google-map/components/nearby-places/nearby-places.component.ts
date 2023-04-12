import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { MapModel } from '../../models/map-model';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-nearby-places',
  templateUrl: './nearby-places.component.html',
  styleUrls: ['./nearby-places.component.scss'],
})
export class NearbyPlacesComponent implements OnInit, OnDestroy {
  mapForm: FormGroup;
  mapModel: MapModel = new MapModel();
  //nearbyTopics: any;
  latitude: number = 0;
  longitude: number = 0;
  private geoCoder: any;
  address: string = '';
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  private unsubscribe: Subscription[] = [];
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  topicList: any[] = [];
  zoom = 12;
  previousInfoWindow: MapInfoWindow;
  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;
  @ViewChildren('marker') mapMarker: QueryList<MapMarker>;
  @ViewChild('infoWindow', { static: true }) infoWindow: MapInfoWindow;

  constructor(
    private fb: FormBuilder,
    private changeDetect: ChangeDetectorRef,
    private mapService: MapsService
  ) {
    this.setCurrentLocation();
  }
  ngOnInit(): void {
    this.initForm();
    this.geoCoder = new google.maps.Geocoder();
  }

  get frmControl() {
    return this.mapForm.controls;
  }

  initForm() {
    this.mapForm = this.fb.group({
      topic: ['', [Validators.required]],
      address: ['', [Validators.required]],
      distance: ['', [Validators.required]],
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.center = { lat: this.latitude, lng: this.longitude };
        var latlong: google.maps.LatLngLiteral = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.markerPositions.push(latlong);
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
            this.mapForm.patchValue({ address: this.address });
            this.changeDetect.detectChanges();
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  showTopicsInMap() {
    if (this.mapForm.invalid) {
      this.mapForm.markAllAsTouched();
      return;
    }
    this.mapModel.topic = this.frmControl.topic.value;
    this.mapModel.address = this.frmControl.address.value;
    this.mapModel.distance = this.frmControl.distance.value;
    const mapSubscr =this.mapService
      .getNearbyPlacesList(this.mapModel)
      .subscribe((response: any) => {
        this.topicList = response;
        //this.nearbyTopics = response;
        this.changeDetect.detectChanges();
      });

      this.unsubscribe.push(mapSubscr);
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  openInfoWindowFromItemClick(windowIndex: number) {
    /// stores the current index in forEach
    let markerIndex = 0;
    let curIdx = 0;

    this.mapMarker.forEach((marker: MapMarker) => {
      if (windowIndex === markerIndex) {
        this.infoWindowsView.forEach((window: MapInfoWindow) => {
          if (windowIndex === curIdx) {
            if (this.previousInfoWindow) {
              this.previousInfoWindow.close();
            }
            this.previousInfoWindow = window;
            window.open(marker);
            curIdx++;
          } else {
            curIdx++;
          }
        });
      } else {
        markerIndex++;
      }
    });
  }

  topicClick(i: number) {
    let clickedLat = this.topicList[i].latitude;
    let clickedLng = this.topicList[i].longitude;
    this.center = { lat: clickedLat, lng: clickedLng };
    this.markerPositions = [];
    var latlong: google.maps.LatLngLiteral = {
      lat: clickedLat,
      lng: clickedLng,
    };
    this.markerPositions.push(latlong);
    this.openInfoWindowFromItemClick(i);
    this.changeDetect.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
