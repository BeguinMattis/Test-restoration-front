import { TestBed, inject } from '@angular/core/testing';
import { MarkerService } from './marker.service';
import { Marker } from '../../models/marker.model';

describe('MarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', inject([MarkerService], (markerService: MarkerService) => {
      expect(markerService).toBeTruthy();
    }));
  });

  describe('check', () => {
    it('Should return true', () => {
      const marker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      expect(MarkerService.check(marker)).toBeTruthy();
    });

    it('Should return false', () => {
      const marker: any = null;
      expect(MarkerService.check(marker)).toBeFalsy();
    });
  });
});
