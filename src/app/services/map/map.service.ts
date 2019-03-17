import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MarkerService } from '../marker/marker.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  userMarkerSubject: Subject<Marker>;

  constructor() {
    this.userMarkerSubject = new Subject<Marker>();
  }

  setUserMarker(userMarker: Marker): void {
    if (MarkerService.check(userMarker) === true) {
      this.userMarkerSubject.next(userMarker);
    }
  }
}
