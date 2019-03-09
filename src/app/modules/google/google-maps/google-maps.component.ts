import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  latitude: number;
  longitude: number;

  constructor() { }

  ngOnInit() {
    this.latitude = 51.678418;
    this.longitude = 7.809007;
  }

}
