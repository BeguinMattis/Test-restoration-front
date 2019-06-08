import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchRestaurantComponent } from './search-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { SearchRestaurantService } from '../../../services/search-restaurant/search-restaurant.service';
import { MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserMarker } from '../../../models/user-marker.model';
import { of } from 'rxjs';
import { UserMarkerService } from '../../../services/user-marker/user-marker.service';
import { Restaurant } from '../../../models/restaurant.model';
import { AddOpinion } from '../../../models/add-opinion.model';
import { AddOpinionComponent } from '../../add-opinion/add-opinion/add-opinion.component';

describe('SearchRestaurantComponent', () => {
  let component: SearchRestaurantComponent;
  let fixture: ComponentFixture<SearchRestaurantComponent>;
  const geolocationServiceMock: jasmine.SpyObj<GeolocationService> =
    jasmine.createSpyObj('GeolocationService', ['getStreetMarkerSubject', 'getUserCoordinates', 'getStreetCoordinates']);
  const searchRestaurantServiceMock: jasmine.SpyObj<SearchRestaurantService> =
    jasmine.createSpyObj('SearchRestaurantService', ['getRestaurantsCoordinates']);
  const matDialogMock: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRestaurantComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: GeolocationService,
          useValue: geolocationServiceMock
        },
        {
          provide: SearchRestaurantService,
          useValue: searchRestaurantServiceMock
        },
        {
          provide: MatDialog,
          useValue: matDialogMock
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRestaurantComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should create the component', () => {
      const parisMarker: UserMarker = {
        latitude: 48.8534,
        longitude: 2.3488
      };
      const userMarker: UserMarker = {
        latitude: 0,
        longitude: 0
      };
      geolocationServiceMock.getStreetMarkerSubject.and.returnValue(of(userMarker));
      fixture.detectChanges();
      spyOn(component, 'initForm');
      spyOn(UserMarkerService, 'check').and.returnValue(true);
      component.ngOnInit();
      expect(component.parisMarker).toEqual(parisMarker);
      expect(component.initForm).toHaveBeenCalled();
      expect(geolocationServiceMock.getStreetCoordinates).toHaveBeenCalled();
      expect(component.restaurants).toEqual([]);
      expect(geolocationServiceMock.getStreetMarkerSubject).toHaveBeenCalled();
      expect(UserMarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(component.userMarker).toEqual(userMarker);
      expect(component).toBeTruthy();
    });
  });

  describe('initForm', () => {
    it('Should initialize the address form', () => {
      fixture.detectChanges();
      spyOn(component['formBuilder'], 'group');
      component.initForm();
      expect(component['formBuilder'].group).toHaveBeenCalledWith({
        address: ''
      });
    });

    it('Should initialize the address field', () => {
      fixture.detectChanges();
      component.initForm();
      expect(component.addressForm.value['address']).toEqual('');
    });
  });

  describe('getUserCoordinates', () => {
    it('Should get the user coordinates', fakeAsync(()  => {
      const userMarker: UserMarker = {
        latitude: 0,
        longitude: 0
      };
      geolocationServiceMock.getUserCoordinates.and.returnValue(Promise.resolve(userMarker));
      fixture.detectChanges();
      component.getUserCoordinates();
      tick();
      expect(geolocationServiceMock.getUserCoordinates).toHaveBeenCalled();
      expect(component.userMarker).toEqual(userMarker);
    }));
  });

  describe('getRestaurantsCoordinates', () => {
    it('Should get the restaurants coordinates', fakeAsync(()  => {
      const userMarker: UserMarker = {
        latitude: 0,
        longitude: 0
      };
      const radius = 2000;
      const restaurants: Restaurant[] = [
        {
          id: 'id',
          name: 'name',
          latitude: 0,
          longitude: 0,
          address: 'address'
        }
      ];
      component.userMarker = userMarker;
      searchRestaurantServiceMock.getRestaurantsCoordinates.and.returnValue(Promise.resolve(restaurants));
      fixture.detectChanges();
      component.getRestaurantsCoordinates();
      tick();
      expect(searchRestaurantServiceMock.getRestaurantsCoordinates).toHaveBeenCalledWith(userMarker, radius);
      expect(component.restaurants).toEqual(restaurants);
    }));
  });

  describe('addOpinion', () => {
    it('Should open the addOpinion dialog', () => {
      fixture.detectChanges();
      const restaurant: Restaurant = {
        id: 'id',
        name: 'name',
        latitude: 0,
        longitude: 0,
        address: 'address'
      };
      const data: AddOpinion = {
        restaurant: restaurant
      };
      const config: any = {
        data: data,
        width: 'auto',
        autoFocus: false
      };
      component.addOpinion(restaurant);
      expect(matDialogMock.open).toHaveBeenCalledWith(AddOpinionComponent, config);
    });
  });

  describe('ngOnDestroy', () => {
    it('Should destroy the component', () => {
      fixture.detectChanges();
      spyOn(component['_ngUnsubscribe'], 'next');
      spyOn(component['_ngUnsubscribe'], 'complete');
      component.ngOnDestroy();
      expect(component['_ngUnsubscribe'].next).toHaveBeenCalled();
      expect(component['_ngUnsubscribe'].complete).toHaveBeenCalled();
    });
  });
});
