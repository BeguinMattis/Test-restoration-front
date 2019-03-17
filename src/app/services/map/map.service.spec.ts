import { TestBed, inject } from '@angular/core/testing';
import { MapService } from './map.service';
import { Subject } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MarkerService } from '../marker/marker.service';

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', () => {
      const service: MapService = TestBed.get(MapService);
      const userMarkerSubject: Subject<Marker> = new Subject<Marker>();
      expect(service.userMarkerSubject).toEqual(userMarkerSubject);
      expect(service).toBeTruthy();
    });
  });

  describe('setUserMarker', () => {
    it('Should send the marker object', inject([MapService], (service: MapService) => {
      const userMarker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      spyOn(MarkerService, 'check').and.returnValue(true);
      spyOn(service.userMarkerSubject, 'next');
      service.setUserMarker(userMarker);
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(service.userMarkerSubject.next).toHaveBeenCalledWith(userMarker);
    }));

    it('Should not send the marker object', inject([MapService], (service: MapService) => {
      const userMarker: any = null;
      spyOn(MarkerService, 'check').and.returnValue(false);
      spyOn(service.userMarkerSubject, 'next');
      service.setUserMarker(userMarker);
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(service.userMarkerSubject.next).not.toHaveBeenCalledWith(userMarker);
    }));
  });
});
