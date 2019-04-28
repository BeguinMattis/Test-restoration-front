import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapsAPILoader } from '@agm/core';
import { GeolocationService } from './geolocation.service';
import { Marker } from '../../models/marker.model';
import { HTML5GeolocationAPI } from '../../enums/html5-geolocation-api.enum';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('GeolocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      MapsAPILoader
    ]
  }));

  describe('constructor', () => {
    it('Should create the service', inject([GeolocationService], (geolocationService: GeolocationService) => {
      expect(geolocationService).toBeTruthy();
    }));
  });

  describe('getStreetMarkerSubject', () => {
    it('Should get the streetMarkerSubject', inject([GeolocationService], (geolocationService: GeolocationService) => {
      const response: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      geolocationService['streetMarkerSubject'].next(response);
      geolocationService.getStreetMarkerSubject().subscribe((userMarker: Marker) => {
        expect(userMarker).toEqual(response);
      });
    }));
  });

  describe('getUserCoordinates', () => {
    it('Should return the user coordinates from the HTML5GeolocationAPI method',
      inject([GeolocationService], (geolocationService: GeolocationService) => {
        const response: Marker = {
          latitude: 0,
          longitude: 0,
          display: false
        };
        spyOn<any>(geolocationService, 'HTML5GeolocationAPI').and.returnValue(Promise.resolve(response));
        spyOn<any>(geolocationService, 'IPGeolocationAPI');
        geolocationService.getUserCoordinates().then((userMarker: Marker) => {
          expect(geolocationService['HTML5GeolocationAPI']).toHaveBeenCalled();
          expect(geolocationService['IPGeolocationAPI']).not.toHaveBeenCalled();
          expect(userMarker).toEqual(response);
        });
      })
    );

    it('Should return the user coordinates from the IPGeolocationAPI method',
      inject([GeolocationService], (geolocationService: GeolocationService) => {
        spyOn<any>(geolocationService, 'HTML5GeolocationAPI').and.returnValue(Promise.reject(HTML5GeolocationAPI.POSITION_UNAVAILABLE));
        const position: any = {
          location: {
            lat: 0,
            lng: 0
          },
          accuracy: 0
        };
        spyOn<any>(geolocationService, 'IPGeolocationAPI').and.returnValue(of(position));
        const result: Marker = {
          latitude: 0,
          longitude: 0,
          display: true,
          accuracy: 0
        };
        spyOn(console, 'log');
        geolocationService.getUserCoordinates().then((userMarker: Marker) => {
          expect(geolocationService['HTML5GeolocationAPI']).toHaveBeenCalled();
          expect(geolocationService['IPGeolocationAPI']).toHaveBeenCalled();
          expect(userMarker).toEqual(result);
        });
      })
    );

    it('Should not return the user coordinates because the IPGeolocationAPI method return an error',
      inject([GeolocationService], (geolocationService: GeolocationService) => {
        spyOn<any>(geolocationService, 'HTML5GeolocationAPI').and.returnValue(Promise.reject(HTML5GeolocationAPI.POSITION_UNAVAILABLE));
        spyOn<any>(geolocationService, 'IPGeolocationAPI').and.returnValue(throwError(null));
        spyOn(console, 'error');
        geolocationService.getUserCoordinates().catch((errorMessage: string) => {
          expect(geolocationService['HTML5GeolocationAPI']).toHaveBeenCalled();
          expect(geolocationService['IPGeolocationAPI']).toHaveBeenCalled();
          expect(errorMessage).toEqual('Google Geolocation API returned an error!');
        });
      })
    );

    it('Should not return the user coordinates because the HTML5GeolocationAPI method return an error',
      inject([GeolocationService], (geolocationService: GeolocationService) => {
        spyOn<any>(geolocationService, 'HTML5GeolocationAPI').and.returnValue(Promise.reject(HTML5GeolocationAPI.PERMISSION_DENIED));
        spyOn<any>(geolocationService, 'IPGeolocationAPI');
        geolocationService.getUserCoordinates().catch((errorMessage: string) => {
          expect(geolocationService['HTML5GeolocationAPI']).toHaveBeenCalled();
          expect(geolocationService['IPGeolocationAPI']).not.toHaveBeenCalled();
          expect(errorMessage).toEqual(HTML5GeolocationAPI.PERMISSION_DENIED);
        });
      })
    );
  });

  describe('IPGeolocationAPI', () => {
    it('Should make the HTTP call to get the user coordinates', inject([GeolocationService, HttpClient],
      (geolocationService: GeolocationService, httpClient: HttpClient) => {
        const response: any = {
          location: {
            lat: 0,
            lng: 0
          },
          accuracy: 0
        };
        spyOn(httpClient, 'post').and.returnValue(of(response));
        geolocationService['IPGeolocationAPI']().subscribe((position: any) => {
          expect(httpClient.post).toHaveBeenCalledWith(environment.google_geolocation_api_base_url_resource_path + '?key=' +
            environment.api_key, null);
          expect(position).toEqual(response);
        });
      }));
  });
});
