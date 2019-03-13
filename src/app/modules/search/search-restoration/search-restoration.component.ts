import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import Autocomplete = google.maps.places.Autocomplete;
import PlaceResult = google.maps.places.PlaceResult;
import { Marker } from '../../../models/marker.model';
import { MapService } from '../../../services/map.service';

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
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private mapService: MapService) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      addressControl: ''
    });
    this.getAddress();
  }

  getUserAddress(): void {
    this.HTML5GeolocationAPI();
  }

  HTML5GeolocationAPI(): boolean {
    if ((window.navigator) && (window.navigator.geolocation)) {
      window.navigator.geolocation.getCurrentPosition((position: Position) => {
          const marker: Marker = {
            latitude: +position.coords.latitude,
            longitude: +position.coords.longitude,
            display: true
          };
          console.log('Marker : ' + JSON.stringify(marker));
          this.mapService.setAddress(marker);
          return true;
        },
        (error: PositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for geolocation!');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable!');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out!');
              break;
            default:
              console.error('An unknown error occurred!');
              break;
          }
          console.error(error.message);
          return false;
        },
        {enableHighAccuracy: true});
    } else {
      console.error('Geolocation is not supported by this browser!');
      return false;
    }
  }

  getAddress(): void {
    const addressAutocompleteOptions: AutocompleteOptions = {
      types: ['address']
    };
    this.mapsAPILoader.load().then(() => {
      // tslint:disable-next-line:max-line-length
      const addressAutocomplete: Autocomplete = new google.maps.places.Autocomplete(this.addressRef.nativeElement, addressAutocompleteOptions);
      addressAutocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const addressResult: PlaceResult = addressAutocomplete.getPlace();

          if (addressResult.geometry === undefined || addressResult.geometry === null) {
            return;
          }

          const marker: Marker = {
            latitude: +addressResult.geometry.location.lat(),
            longitude: +addressResult.geometry.location.lng(),
            display: true
          };
          console.log('Marker : ' + JSON.stringify(marker));
          this.mapService.setAddress(marker);
        });
      });
    });
  }

}
