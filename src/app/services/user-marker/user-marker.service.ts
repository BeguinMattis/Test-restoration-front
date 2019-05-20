import { Injectable } from '@angular/core';
import { UserMarker } from '../../models/user-marker.model';

@Injectable({
  providedIn: 'root'
})
export class UserMarkerService {

  constructor() { }

  static check(userMarker: UserMarker): boolean {
    return (((userMarker !== null) && (userMarker !== undefined)) &&
      ((userMarker.latitude !== null) && (userMarker.latitude !== undefined) && (typeof userMarker.latitude === 'number')) &&
      ((userMarker.longitude !== null) && (userMarker.longitude !== undefined) && (typeof userMarker.longitude === 'number')));
  }
}
