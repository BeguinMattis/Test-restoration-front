import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListOpinionsComponent } from './list-opinions.component';
import { OpinionService } from '../../../services/opinion/opinion.service';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalOpinion } from '../../../models/global-opinion.model';
import { ListOpinions } from '../../../models/list-opinions.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../../../models/restaurant.model';

describe('ListOpinionsComponent', () => {
  let component: ListOpinionsComponent;
  let fixture: ComponentFixture<ListOpinionsComponent>;
  const opinionServiceMock: jasmine.SpyObj<OpinionService> = jasmine.createSpyObj('OpinionService', ['getOpinions']);
  const restaurantServiceMock: jasmine.SpyObj<RestaurantService> = jasmine.createSpyObj('RestaurantService', ['getDetails']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOpinionsComponent ],
      providers: [
        {
          provide: OpinionService,
          useValue: opinionServiceMock
        },
        {
          provide: RestaurantService,
          useValue: restaurantServiceMock
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOpinionsComponent);
    component = fixture.componentInstance;
    spyOn(console, 'error');
  });

  describe('ngOnInit', () => {
    it('Should create the component and retrieve the opinions list', () => {
      const globalOpinion: GlobalOpinion = {
        _id: '_id',
        starters: [],
        main_courses: [],
        desserts: [],
        place_id: 'place_id'
      };
      const listOpinions: ListOpinions = {
        _id: '_id',
        opinions: [globalOpinion]
      };
      opinionServiceMock.getOpinions.and.returnValue(of(listOpinions));
      fixture.detectChanges();
      spyOn(component, 'getDetails');
      component.ngOnInit();
      expect(opinionServiceMock.getOpinions).toHaveBeenCalled();
      expect(component.listOpinions).toEqual(listOpinions);
      expect(component.getDetails).toHaveBeenCalledTimes(1);
      expect(component.getDetails).toHaveBeenCalledWith(globalOpinion);
      expect(component).toBeTruthy();
    });

    it('Should create the component and not retrieve the opinions list', () => {
      const error: any = {} as HttpErrorResponse;
      opinionServiceMock.getOpinions.and.returnValue(throwError(error));
      fixture.detectChanges();
      component.ngOnInit();
      expect(opinionServiceMock.getOpinions).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error: ' + error);
      expect(component).toBeTruthy();
    });
  });

  describe('getDetails', () => {
    it('Should set the restaurant name and address', fakeAsync(()  => {
      const globalOpinion: GlobalOpinion = {
        _id: '_id',
        starters: [],
        main_courses: [],
        desserts: [],
        place_id: 'place_id'
      };
      const restaurant: Restaurant = {
        place_id: 'place_id',
        name: 'name',
        latitude: 0,
        longitude: 0,
        address: 'address'
      };
      restaurantServiceMock.getDetails.and.returnValue(Promise.resolve(restaurant));
      fixture.detectChanges();
      component.getDetails(globalOpinion);
      tick();
      expect(restaurantServiceMock.getDetails).toHaveBeenCalledWith(globalOpinion.place_id);
      expect(globalOpinion.name).toEqual(restaurant.name);
      expect(globalOpinion.address).toEqual(globalOpinion.address);
    }));
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
