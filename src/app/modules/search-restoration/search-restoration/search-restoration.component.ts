import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { SearchRestorationService } from '../../../services/search-restoration/search-restoration.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Marker } from '../../../models/marker.model';
import { MarkerService } from '../../../services/marker/marker.service';

@Component({
  selector: 'app-search-restoration',
  templateUrl: './search-restoration.component.html',
  styleUrls: ['./search-restoration.component.css']
})
export class SearchRestorationComponent implements OnInit, OnDestroy {

  addressForm: FormGroup;
  @ViewChild('address')
  addressRef: ElementRef;
  private _ngUnsubscribe: Subject<any>;
  streetMarkerSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private geolocationService: GeolocationService,
              private searchRestorationService: SearchRestorationService) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      addressControl: ''
    });
    this.geolocationService.getStreetCoordinates(this.addressRef);
    this._ngUnsubscribe = new Subject<any>();
    this.streetMarkerSubscription = this.geolocationService.getStreetMarkerSubject()
      .pipe(takeUntil(this._ngUnsubscribe))
      .pipe(filter((userMarker: Marker) => MarkerService.check(userMarker) === true))
      .subscribe((userMarker: Marker) => {
        this.searchRestorationService.setUserMarker(userMarker);
      });
  }

  getUserCoordinates(): void {
    this.geolocationService.getUserCoordinates().then((userMarker: Marker) => {
      this.searchRestorationService.setUserMarker(userMarker);
    }).catch((errorMessage: string) => {
      // TODO: Display an alert for the user
    });
  }

  getRestaurantsCoordinates(): void {
    this.searchRestorationService.getRestaurantsCoordinates(2000, this.addressRef);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
