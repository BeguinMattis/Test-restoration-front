import { TestBed, inject } from '@angular/core/testing';
import { UserMarkerService } from './user-marker.service';
import { UserMarker } from '../../models/user-marker.model';

describe('UserMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', inject([UserMarkerService], (userMarkerService: UserMarkerService) => {
      expect(userMarkerService).toBeTruthy();
    }));
  });

  describe('check', () => {
    it('Should return true', () => {
      const userMarker: UserMarker = {
        latitude: 0,
        longitude: 0
      };
      expect(UserMarkerService.check(userMarker)).toBeTruthy();
    });

    it('Should return false', () => {
      const userMarker: any = null;
      expect(UserMarkerService.check(userMarker)).toBeFalsy();
    });
  });
});
