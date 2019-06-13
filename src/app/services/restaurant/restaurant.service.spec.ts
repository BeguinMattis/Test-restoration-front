import { TestBed, inject } from '@angular/core/testing';
import { RestaurantService } from './restaurant.service';
import { MapsAPILoader } from '@agm/core';

describe('RestaurantService', () => {
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
      inject([RestaurantService], (restaurantService: RestaurantService) => {
        expect(restaurantService).toBeTruthy();
      })
    );
  });
});
