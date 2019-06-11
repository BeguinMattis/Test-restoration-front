import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { UserMarker } from '../../../models/user-marker.model';
import { Restaurant } from '../../../models/restaurant.model';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { MatDialog } from '@angular/material';
import { takeUntil, filter } from 'rxjs/operators';
import { UserMarkerService } from '../../../services/user-marker/user-marker.service';
import { AddOpinionComponent } from '../../add-opinion/add-opinion/add-opinion.component';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css']
})
export class SearchRestaurantComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  @ViewChild('address')
  addressRef: ElementRef;
  streetMarkerSubscription: Subscription;
  private _ngUnsubscribe: Subject<any>;
  parisMarker: UserMarker;
  userMarker: UserMarker;
  restaurants: Restaurant[];

  constructor(private formBuilder: FormBuilder,
              private geolocationService: GeolocationService,
              private restaurantService: RestaurantService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.parisMarker = {
      latitude: 48.8534,
      longitude: 2.3488
    };
    this.initForm();
    this.geolocationService.getStreetCoordinates(this.addressRef);
    this._ngUnsubscribe = new Subject<any>();
    this.userMarker = null;
    this.restaurants = null;
    this.streetMarkerSubscription = this.geolocationService.getStreetMarkerSubject()
      .pipe(takeUntil(this._ngUnsubscribe))
      .pipe(filter((userMarker: UserMarker) => UserMarkerService.check(userMarker) === true))
      .subscribe((userMarker: UserMarker) => {
        this.restaurants = null;
        this.userMarker = userMarker;
      });
  }

  initForm(): void {
    this.addressForm = this.formBuilder.group({
      address: ''
    });
  }

  getUserCoordinates(): void {
    this.restaurants = null;
    this.geolocationService.getUserCoordinates().then((userMarker: UserMarker) => {
      this.userMarker = userMarker;
    }).catch((errorMessage: string) => {
      // TODO: Display an alert for the user
    });
  }

  getRestaurantsCoordinates(): void {
    const radius = 2000;
    this.restaurantService.getRestaurantsCoordinates(this.userMarker, radius).then((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    }).catch((errorMessage: string) => {
      // TODO: Display an alert for the user
    });
  }

  addOpinion(restaurant: Restaurant): void {
    this.matDialog.open(AddOpinionComponent, {
      data: {restaurant: restaurant},
      width: 'auto',
      autoFocus: false
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
