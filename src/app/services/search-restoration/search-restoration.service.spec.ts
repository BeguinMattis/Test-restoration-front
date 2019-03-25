import { TestBed, inject } from '@angular/core/testing';
import { SearchRestorationService } from './search-restoration.service';
import { Subject } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MarkerService } from '../marker/marker.service';

describe('SearchRestorationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('constructor', () => {
    it('Should create the service', inject([SearchRestorationService], (searchRestorationService: SearchRestorationService) => {
      const userMarkerSubject: Subject<Marker> = new Subject<Marker>();
      expect(searchRestorationService['userMarkerSubject']).toEqual(userMarkerSubject);
      expect(searchRestorationService).toBeTruthy();
    }));
  });

  describe('getUserMarkerSubject', () => {
    it('Should get the userMarkerSubject', inject([SearchRestorationService], (searchRestorationService: SearchRestorationService) => {
      const response: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      searchRestorationService['userMarkerSubject'].next(response);
      searchRestorationService.getUserMarkerSubject().subscribe((userMarker: Marker) => {
        expect(userMarker).toEqual(response);
      });
    }));
  });

  describe('setUserMarker', () => {
    it('Should send the userMarker object', inject([SearchRestorationService], (searchRestorationService: SearchRestorationService) => {
      const userMarker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      spyOn(MarkerService, 'check').and.returnValue(true);
      spyOn(searchRestorationService['userMarkerSubject'], 'next');
      const result = searchRestorationService.setUserMarker(userMarker);
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(searchRestorationService['userMarkerSubject'].next).toHaveBeenCalledWith(userMarker);
      expect(result).toEqual(true);
    }));

    it('Should not send the userMarker object', inject([SearchRestorationService], (searchRestorationService: SearchRestorationService) => {
      const userMarker: any = null;
      spyOn(MarkerService, 'check').and.returnValue(false);
      spyOn(searchRestorationService['userMarkerSubject'], 'next');
      const result = searchRestorationService.setUserMarker(userMarker);
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(searchRestorationService['userMarkerSubject'].next).not.toHaveBeenCalledWith(userMarker);
      expect(result).toEqual(false);
    }));
  });
});
