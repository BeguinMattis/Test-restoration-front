import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import Autocomplete = google.maps.places.Autocomplete;
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  streetMarkerSubject: Subject<Marker>;

  constructor(private http: HttpClient,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.streetMarkerSubject = new Subject<Marker>();
  }

  getUserCoordinates(): Promise<Marker | string> {
    return new Promise((resolve, reject) => {
      this.HTML5GeolocationAPI().then((userMarker: Marker) => {
        resolve(userMarker);
      }).catch((errorMessage: String) => {
         if ((errorMessage === 'Location information is unavailable!') ||
            (errorMessage === 'The request to get user location timed out!') ||
            (errorMessage === 'An unknown error occurred!')) {
           this.IPGeolocationAPI().subscribe((position: any) => {
             const userMarker: Marker = {
               latitude: +position.location.lat,
               longitude: +position.location.lng,
               display: true,
               accuracy: +position.accuracy
             };
             console.log('User marker : ' + JSON.stringify(userMarker));
             resolve(userMarker);
           }, ((error) => {
             errorMessage = 'Google Geolocation API returned an error!';
             console.error(error);
             reject(errorMessage);
           }));
        } else {
           reject(errorMessage);
         }
      });
    });
  }

  private HTML5GeolocationAPI(): Promise<Marker | string> {
    return new Promise((resolve, reject) => {
      if ((window.navigator) && (window.navigator.geolocation)) {
        window.navigator.geolocation.getCurrentPosition((position: Position) => {
            const userMarker: Marker = {
              latitude: +position.coords.latitude,
              longitude: +position.coords.longitude,
              display: true
            };
            console.log('User marker : ' + JSON.stringify(userMarker));
            resolve(userMarker);
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
            console.error('Error : ' + JSON.stringify(error));
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

  private IPGeolocationAPI(): Observable<any> {
    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + environment.google_api_key, null);
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

          const userMarker: Marker = {
            latitude: +addressResult.geometry.location.lat(),
            longitude: +addressResult.geometry.location.lng(),
            display: true
          };
          console.log('User marker : ' + JSON.stringify(userMarker));
          this.streetMarkerSubject.next(userMarker);
        });
      });
    });
  }
}
