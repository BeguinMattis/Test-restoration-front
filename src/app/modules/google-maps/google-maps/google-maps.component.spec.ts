import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleMapsComponent } from './google-maps.component';
import { Marker } from '../../../models/marker.model';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapsComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should create the component', () => {
      const parisMarker = {
        latitude: 48.8534,
        longitude: 2.3488,
        display: false
      };
      spyOn(component['mapService'], 'setUserMarker');
      component.ngOnInit();
      expect(component.restorationMarkers).toEqual([]);
      expect(component['mapService'].setUserMarker).toHaveBeenCalledWith(parisMarker);
      expect(component.userMarker).toEqual(parisMarker);
      expect(component).toBeTruthy();
    });
  });

  describe('addRestorationMarker', () => {
    it('Should add a marker in the restorationMarkers array', () => {
      const restorationMarker: Marker = {
        latitude: 0,
        longitude: 0,
        display: true
      };
      component.restorationMarkers = [];
      component.addRestorationMarker(restorationMarker);
      expect(component.restorationMarkers.length).toEqual(1);
      expect(component.restorationMarkers).toEqual([restorationMarker]);
    });

    it('Should not add a marker in the restorationMarkers array', () => {
      const restorationMarker: any = null;
      component.restorationMarkers = [];
      component.addRestorationMarker(restorationMarker);
      expect(component.restorationMarkers.length).toEqual(0);
      expect(component.restorationMarkers).toEqual([]);
    });
  });

  describe('ngOnDestroy', () => {
    it('Should destroy the component', () => {
      spyOn(component['_ngUnsubscribe'], 'next');
      spyOn(component['_ngUnsubscribe'], 'complete');
      component.ngOnDestroy();
      expect(component['_ngUnsubscribe'].next).toHaveBeenCalled();
      expect(component['_ngUnsubscribe'].complete).toHaveBeenCalled();
    });
  });
});
