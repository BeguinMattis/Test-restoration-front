import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Marker } from '../../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  userMarkerSubject: Subject<Marker>;

  constructor() {
    this.userMarkerSubject = new Subject<Marker>();
  }

  setUserMarker(marker: Marker): void {
    this.userMarkerSubject.next(marker);
  }

}
