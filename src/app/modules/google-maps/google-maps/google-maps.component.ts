import { Component, OnInit, OnDestroy } from '@angular/core';
import { Marker } from '../../../models/marker.model';
import { Subject, Subscription } from 'rxjs';
import { MapService } from '../../../services/map/map.service';
import { MarkerService } from '../../../services/marker/marker.service';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit, OnDestroy {

  userMarker: Marker;
  restorationMarkers: Marker[];
  private _ngUnsubscribe: Subject<any>;
  userMarkerSubscription: Subscription;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.restorationMarkers = [];
    this._ngUnsubscribe = new Subject<any>();
    this.userMarkerSubscription = this.mapService.userMarkerSubject
      .pipe(takeUntil(this._ngUnsubscribe))
      .pipe(filter((userMarker: Marker) => MarkerService.check(userMarker) === true))
      .subscribe((userMarker: Marker) => {
        this.userMarker = userMarker;
      }
    );
    const parisMarker: Marker = {
      latitude: 48.8534,
      longitude: 2.3488,
      display: false
    };
    this.mapService.setUserMarker(parisMarker);
  }

  addRestorationMarker(restorationMarker: Marker): void {
    if (MarkerService.check(restorationMarker) === true) {
      this.restorationMarkers.push(restorationMarker);
    }
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
