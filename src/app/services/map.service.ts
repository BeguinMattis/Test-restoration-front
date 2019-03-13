import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Marker } from '../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  markerSubject: Subject<Marker>;

  constructor() {
    this.markerSubject = new Subject<Marker>();
  }

  setAddress(marker: Marker): void {
    this.markerSubject.next(marker);
  }

}
