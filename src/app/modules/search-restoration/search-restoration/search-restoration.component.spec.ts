import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { SearchRestorationComponent } from './search-restoration.component';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRestorationService } from '../../../services/search-restoration/search-restoration.service';
import { Marker } from '../../../models/marker.model';
import { of, Subject } from 'rxjs';
import { MarkerService } from '../../../services/marker/marker.service';

describe('SearchRestorationComponent', () => {
  let component: SearchRestorationComponent;
  let fixture: ComponentFixture<SearchRestorationComponent>;
  const geolocationServiceMock: jasmine.SpyObj<GeolocationService> =
    jasmine.createSpyObj('GeolocationService', ['getStreetMarkerSubject', 'getUserCoordinates', 'getStreetCoordinates']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRestorationComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: GeolocationService,
          useValue: geolocationServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRestorationComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should create the component', inject([GeolocationService, SearchRestorationService],
      (geolocationService: GeolocationService, searchRestorationService: SearchRestorationService) => {
      const userMarker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      geolocationServiceMock.getStreetMarkerSubject.and.returnValue(of(userMarker));
      fixture.detectChanges();
      spyOn(MarkerService, 'check').and.returnValue(true);
      spyOn(searchRestorationService, 'setUserMarker');
      component.ngOnInit();
      expect(geolocationService.getStreetCoordinates).toHaveBeenCalled();
      expect(MarkerService.check).toHaveBeenCalledWith(userMarker);
      expect(searchRestorationService.setUserMarker).toHaveBeenCalledWith(userMarker);
      expect(component).toBeTruthy();
    }));
  });

  describe('getUserCoordinates', () => {
    it('Should get and send the user coordinates to the setUserMarker method of the SearchRestorationService',
      fakeAsync(inject([GeolocationService, SearchRestorationService], (geolocationService: GeolocationService,
        searchRestorationService: SearchRestorationService)  => {
      const streetMarkerSubject = new Subject();
      geolocationServiceMock.getStreetMarkerSubject.and.returnValue(streetMarkerSubject.asObservable());
      const userMarker: Marker = {
        latitude: 0,
        longitude: 0,
        display: false
      };
      geolocationServiceMock.getUserCoordinates.and.returnValue(Promise.resolve(userMarker));
      fixture.detectChanges();
      spyOn(searchRestorationService, 'setUserMarker');
      component.getUserCoordinates();
      tick();
      expect(searchRestorationService.setUserMarker).toHaveBeenCalledWith(userMarker);
    })));
  });

  describe('ngOnDestroy', () => {
    it('Should destroy the component', () => {
      const streetMarkerSubject = new Subject();
      geolocationServiceMock.getStreetMarkerSubject.and.returnValue(streetMarkerSubject.asObservable());
      fixture.detectChanges();
      spyOn(component['_ngUnsubscribe'], 'next');
      spyOn(component['_ngUnsubscribe'], 'complete');
      component.ngOnDestroy();
      expect(component['_ngUnsubscribe'].next).toHaveBeenCalled();
      expect(component['_ngUnsubscribe'].complete).toHaveBeenCalled();
    });
  });
});
