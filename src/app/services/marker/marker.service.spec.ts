import { TestBed, inject } from '@angular/core/testing';
import { MarkerService } from './marker.service';
import { Marker } from '../../models/marker.model';

describe('MarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', () => {
      const service: MarkerService = TestBed.get(MarkerService);
      expect(service).toBeTruthy();
    });
  });

  describe('check', () => {
    it('Should return true', inject([MarkerService], (service: MarkerService) => {
      const marker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      expect(service.check(marker)).toEqual(true);
    }));

    it('Should return false', inject([MarkerService], (service: MarkerService) => {
      const marker: any = null;
      expect(service.check(marker)).toEqual(false);
    }));
  });
});
