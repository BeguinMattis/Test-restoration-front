import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MarkerService } from '../marker/marker.service';

@Injectable({
  providedIn: 'root'
})
export class SearchRestorationService {

  private userMarkerSubject: Subject<Marker>;

  constructor() {
    this.userMarkerSubject = new Subject<Marker>();
  }

  getUserMarkerSubject(): Observable<Marker> {
    return this.userMarkerSubject.asObservable();
  }

  setUserMarker(userMarker: Marker): boolean {
    if (MarkerService.check(userMarker) === true) {
      this.userMarkerSubject.next(userMarker);
      return true;
    }

    return false;
  }
}
