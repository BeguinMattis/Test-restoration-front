import { TestBed, inject } from '@angular/core/testing';
import { MapService } from './map.service';
import { Subject } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MarkerService } from '../marker/marker.service';

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', inject([MapService], (mapService: MapService) => {
      const userMarkerSubject: Subject<Marker> = new Subject<Marker>();
      expect(mapService.userMarkerSubject).toEqual(userMarkerSubject);
      expect(mapService).toBeTruthy();
    }));
  });

  describe('setUserMarker', () => {
    it('Should send the userMarker object', inject([MapService], (mapService: MapService) => {
      const userMarker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      spyOn(MarkerService, 'check').and.returnValue(true);
      spyOn(mapService.userMarkerSubject, 'next');
      mapService.setUserMarker(userMarker);
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(mapService.userMarkerSubject.next).toHaveBeenCalledWith(userMarker);
    }));

    it('Should not send the userMarker object', inject([MapService], (mapService: MapService) => {
      const userMarker: any = null;
      spyOn(MarkerService, 'check').and.returnValue(false);
      spyOn(mapService.userMarkerSubject, 'next');
      mapService.setUserMarker(userMarker);
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(mapService.userMarkerSubject.next).not.toHaveBeenCalledWith(userMarker);
    }));
  });
});
