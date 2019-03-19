import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { MapService } from '../../../services/map/map.service';
import { filter } from 'rxjs/operators';
import { Marker } from '../../../models/marker.model';
import { MarkerService } from '../../../services/marker/marker.service';

@Component({
  selector: 'app-search-restoration',
  templateUrl: './search-restoration.component.html',
  styleUrls: ['./search-restoration.component.css']
})
export class SearchRestorationComponent implements OnInit {

  addressForm: FormGroup;

  @ViewChild('address')
  addressRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private geolocationService: GeolocationService,
              private mapService: MapService) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      addressControl: ''
    });
    this.geolocationService.getStreetCoordinates(this.addressRef);
    this.geolocationService.streetMarkerSubject
      .pipe(filter((userMarker: Marker) => MarkerService.check(userMarker) === true))
      .subscribe((userMarker: Marker) => {
        this.mapService.setUserMarker(userMarker);
      });
  }

  getUserCoordinates(): void {
    this.geolocationService.getUserCoordinates().then((userMarker: Marker) => {
      this.mapService.setUserMarker(userMarker);
    }).catch((errorMessage: String) => {
      // TODO: Display an alert for the user
    });
  }
}
