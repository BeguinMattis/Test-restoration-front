import { Component, OnInit } from '@angular/core';
import { Marker } from '../../../models/marker.model';

@Component({
  selector: 'app-search-restoration',
  templateUrl: './search-restoration.component.html',
  styleUrls: ['./search-restoration.component.css']
})
export class SearchRestorationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getUserLocation(): void {
    this.HTML5GeolocationAPI();
  }

  HTML5GeolocationAPI(): boolean {
    if ((window.navigator) && (window.navigator.geolocation)) {
      window.navigator.geolocation.getCurrentPosition((position: Position) => {
          const marker: Marker = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log('Marker : ' + JSON.stringify(marker));
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

}
