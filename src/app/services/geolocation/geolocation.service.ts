import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import Autocomplete = google.maps.places.Autocomplete;
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  streetMarkerSubject: Subject<Marker>;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.streetMarkerSubject = new Subject<Marker>();
  }

  getUserCoordinates(): Promise<Marker | string> {
    return new Promise((resolve, reject) => {
      this.HTML5GeolocationAPI().then((marker: Marker) => {
        resolve(marker);
      }).catch((errorMessage: String) => {
        reject(errorMessage);
      });
    });
  }

  private HTML5GeolocationAPI(): Promise<Marker | string> {
    return new Promise((resolve, reject) => {
      if ((window.navigator) && (window.navigator.geolocation)) {
        window.navigator.geolocation.getCurrentPosition((position: Position) => {
            const marker: Marker = {
              latitude: +position.coords.latitude,
              longitude: +position.coords.longitude,
              display: true
            };
            console.log('Marker : ' + JSON.stringify(marker));
            resolve(marker);
          },
          (error: PositionError) => {
            let errorMessage;

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'User denied the request for geolocation!';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable!';
                break;
              case error.TIMEOUT:
                errorMessage = 'The request to get user location timed out!';
                break;
              default:
                errorMessage = 'An unknown error occurred!';
                break;
            }

            console.error(errorMessage);
            console.error(error.message);
            reject(errorMessage);
          },
          {enableHighAccuracy: true});
      } else {
        const errorMessage = 'Geolocation is not supported by this browser!';
        console.error(errorMessage);
        reject(errorMessage);
      }
    });
  }

  getStreetCoordinates(addressRef: ElementRef) {
    const addressAutocompleteOptions: AutocompleteOptions = {
      types: ['address']
    };
    this.mapsAPILoader.load().then(() => {
      const addressAutocomplete: Autocomplete = new google.maps.places.Autocomplete(addressRef.nativeElement, addressAutocompleteOptions);
      addressAutocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const addressResult: PlaceResult = addressAutocomplete.getPlace();

          if (addressResult.geometry === null || addressResult.geometry === undefined) {
            return;
          }

          const marker: Marker = {
            latitude: +addressResult.geometry.location.lat(),
            longitude: +addressResult.geometry.location.lng(),
            display: true
          };
          console.log('Marker : ' + JSON.stringify(marker));
          this.streetMarkerSubject.next(marker);
        });
      });
    });
  }

}
