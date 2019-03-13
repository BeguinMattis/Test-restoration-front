import { Component, OnInit } from '@angular/core';
import { Marker } from '../../../models/marker.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  userMarker: Marker;
  restorationMarkers: Marker[];
  markerSubscription: Subscription;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.userMarker = {
      latitude: 48.8534,
      longitude: 2.3488,
      display: false
    };
    this.markerSubscription = this.mapService.markerSubject
      .pipe(filter((marker) => !!marker && !!marker.latitude && !!marker.longitude))
      .subscribe((marker: Marker) => {
        this.userMarker = marker;
      }
    );
  }

  addRestorationMarker(marker: Marker): void {
    this.restorationMarkers.push(marker);
  }

}
