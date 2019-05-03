import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { HTML5GeolocationAPI } from '../../enums/html5-geolocation-api.enum';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import Autocomplete = google.maps.places.Autocomplete;
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private streetMarkerSubject: Subject<Marker>;

  constructor(private http: HttpClient,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.streetMarkerSubject = new Subject<Marker>();
  }

  getStreetMarkerSubject(): Observable<Marker> {
    return this.streetMarkerSubject.asObservable();
  }

  getUserCoordinates(): Promise<Marker | string> {
    return new Promise((resolve, reject) => {
      this.HTML5GeolocationAPI().then((userMarker: Marker) => {
        resolve(userMarker);
      }).catch((errorMessage: String) => {
         if ((errorMessage === HTML5GeolocationAPI.POSITION_UNAVAILABLE) || (errorMessage === HTML5GeolocationAPI.TIMEOUT) ||
           (errorMessage === HTML5GeolocationAPI.DEFAULT)) {
           this.IPGeolocationAPI().subscribe((position: any) => {
             const userMarker: Marker = {
               latitude: +position.location.lat,
               longitude: +position.location.lng,
               display: true,
               accuracy: +position.accuracy
             };
             console.log('User marker: ' + JSON.stringify(userMarker));
             resolve(userMarker);
           }, ((error: HttpErrorResponse) => {
             errorMessage = 'Google Geolocation API returned an error!';
             console.error('Error: ' + error);
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
            console.log('User marker: ' + JSON.stringify(userMarker));
            resolve(userMarker);
          },
          (error: PositionError) => {
            let errorMessage;

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = HTML5GeolocationAPI.PERMISSION_DENIED;
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = HTML5GeolocationAPI.POSITION_UNAVAILABLE;
                break;
              case error.TIMEOUT:
                errorMessage = HTML5GeolocationAPI.TIMEOUT;
                break;
              default:
                errorMessage = HTML5GeolocationAPI.DEFAULT;
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
    return this.http.post(environment.google_geolocation_api_base_url_resource_path + '?key=' + environment.api_key, null);
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
          console.log('User marker: ' + JSON.stringify(userMarker));
          this.streetMarkerSubject.next(userMarker);
        });
      });
    });
  }
}
