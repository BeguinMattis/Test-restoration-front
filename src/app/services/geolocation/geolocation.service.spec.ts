import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapsAPILoader } from '@agm/core';
import { GeolocationService } from './geolocation.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
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

  describe('IPGeolocationAPI', () => {
    it('Should make the HTTP call to get the user coordinates', inject([GeolocationService, HttpClient],
      (geolocationService: GeolocationService, http: HttpClient) => {
        const response: any = {
          latitude: 0,
          longitude: 0,
          accuracy: 0
        };
        spyOn(http, 'post').and.returnValue(of(response));
        geolocationService['IPGeolocationAPI']().subscribe((position: any) => {
          expect(http.post).toHaveBeenCalledWith('https://www.googleapis.com/geolocation/v1/geolocate?key=' +
            environment.google_api_key, null);
          expect(position).toEqual(response);
        });
    }));
  });
});
