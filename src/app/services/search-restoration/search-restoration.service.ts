import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MarkerService } from '../marker/marker.service';
import {MapsAPILoader} from '@agm/core';
import {Restaurant} from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class SearchRestorationService {
  userMarker: Marker;
  private userMarkerSubject: Subject<Marker>;
  restaurantMarker: Marker[];
  private restaurantMarkerSubject: Subject<Marker[]>;
  restaurants: Restaurant[];
  private restaurantSubject: Subject<Restaurant[]>;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.userMarker = null;
    this.userMarkerSubject = new Subject<Marker>();
    this.restaurantMarkerSubject = new Subject<Marker[]>();
    this.restaurantSubject = new Subject<Restaurant[]>();
  }

  getUserMarkerSubject(): Observable<Marker> {
    return this.userMarkerSubject.asObservable();
  }

  setUserMarker(userMarker: Marker): boolean {
    if (MarkerService.check(userMarker) === true) {
      this.userMarker = userMarker;
      this.userMarkerSubject.next(this.userMarker);
      return true;
    }

    return false;
  }

  getRestaurantMarkerSubject(): Observable<Marker[]> {
    return this.restaurantMarkerSubject.asObservable();
  }

  getRestaurantSubject(): Observable<Restaurant[]> {
    return this.restaurantSubject.asObservable();
  }

  getRestaurantsCoordinates(radius: number, element: any): any {
    this.mapsAPILoader.load().then(() => {
      const places = new google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: new google.maps.LatLng(this.userMarker.latitude, this.userMarker.longitude),
        radius: radius,
        types: ['restaurant']
      };
      places.nearbySearch(request, (response: any[]) => {
        const restaurants: Restaurant[] = [];
        const restaurantMarker: Marker[] = [];
        response.forEach((toto) => {
          restaurants.push({
            id: toto.id,
            name: toto.name,
            latitude: toto.geometry.location.lat(),
            longitude: toto.geometry.location.lat(),
            address: toto.vicinity,
            isOpen: toto.opening_hours ? toto.opening_hours.open_now ? toto.opening_hours.open_now : null : null,
            rating: toto.rating ? toto.rating : null,
            number_ratings: toto.user_ratings_total ? toto.user_ratings_total : null
          });
          console.log(toto);
          console.log(toto.geometry.location.lat());
          console.log(toto.geometry.location.lng());
          restaurantMarker.push({
            display: true,
            latitude: toto.geometry.location.lat(),
            longitude: toto.geometry.location.lng()
          });
        });
        this.restaurantMarker = restaurantMarker;
        this.restaurants = restaurants;
        this.restaurantMarkerSubject.next(this.restaurantMarker);
        this.restaurantSubject.next(this.restaurants);
        element.nativeElement.focus();
        element.nativeElement.blur();
        console.log('Response: ' + JSON.stringify(response));
      });
    });
  }
}
