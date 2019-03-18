import { Injectable } from '@angular/core';
import { Marker } from '../../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  static check(marker: Marker): boolean {
    return (((marker !== null) && (marker !== undefined)) &&
      ((marker.latitude !== null) && (marker.latitude !== undefined) && (typeof marker.latitude === 'number')) &&
      ((marker.longitude !== null) && (marker.longitude !== undefined) && (typeof marker.longitude === 'number')) &&
      ((marker.display !== null) && (marker.display !== undefined) && (typeof marker.display === 'boolean')));
  }
}
