import { Injectable } from '@angular/core';
import { UserMarker } from '../../models/user-marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  static check(marker: UserMarker): boolean {
    return (((marker !== null) && (marker !== undefined)) &&
      ((marker.latitude !== null) && (marker.latitude !== undefined) && (typeof marker.latitude === 'number')) &&
      ((marker.longitude !== null) && (marker.longitude !== undefined) && (typeof marker.longitude === 'number')));
  }
}
