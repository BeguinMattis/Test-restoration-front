import { TestBed, inject } from '@angular/core/testing';
import { SearchRestaurantService } from './search-restaurant.service';
import { MapsAPILoader } from '@agm/core';

describe('SearchRestaurantService', () => {
  const mapsAPILoaderMock: any = {
    load: () => Promise.resolve()
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: MapsAPILoader,
        useValue: mapsAPILoaderMock
      }
    ]
  }));

  describe('constructor', () => {
    it('Should create the service',
      inject([SearchRestaurantService], (searchRestaurantService: SearchRestaurantService) => {
        expect(searchRestaurantService).toBeTruthy();
      })
    );
  });
});
