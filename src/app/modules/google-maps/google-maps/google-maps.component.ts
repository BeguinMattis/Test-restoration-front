import { Component, OnInit, OnDestroy } from '@angular/core';
import { Marker } from '../../../models/marker.model';
import { Subject, Subscription } from 'rxjs';
import { SearchRestorationService } from '../../../services/search-restoration/search-restoration.service';
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

  constructor(private searchRestorationService: SearchRestorationService) { }

  ngOnInit() {
    this.restorationMarkers = [];
    this._ngUnsubscribe = new Subject<any>();
    this.userMarkerSubscription = this.searchRestorationService.getUserMarkerSubject()
      .pipe(takeUntil(this._ngUnsubscribe))
      .pipe(filter((userMarker: Marker) => MarkerService.check(userMarker) === true))
      .subscribe((userMarker: Marker) => {
        this.userMarker = userMarker;
      });
    const parisMarker: Marker = {
      latitude: 48.8534,
      longitude: 2.3488,
      display: false
    };
    this.searchRestorationService.setUserMarker(parisMarker);
  }

  addRestorationMarker(restorationMarker: Marker): boolean {
    if (MarkerService.check(restorationMarker) === true) {
      this.restorationMarkers.push(restorationMarker);
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
