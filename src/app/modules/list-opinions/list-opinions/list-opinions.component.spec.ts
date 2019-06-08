import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOpinionsComponent } from './list-opinions.component';
import { OpinionService } from '../../../services/opinion/opinion.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListOpinions } from '../../../models/list-opinions.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('ListOpinionsComponent', () => {
  let component: ListOpinionsComponent;
  let fixture: ComponentFixture<ListOpinionsComponent>;
  const opinionServiceMock: jasmine.SpyObj<OpinionService> = jasmine.createSpyObj('OpinionService', ['getOpinions']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOpinionsComponent ],
      providers: [
        {
          provide: OpinionService,
          useValue: opinionServiceMock
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
      const listOpinions: ListOpinions = {
        _id: '_id',
        opinions: []
      };
      opinionServiceMock.getOpinions.and.returnValue(of(listOpinions));
      fixture.detectChanges();
      component.ngOnInit();
      expect(opinionServiceMock.getOpinions).toHaveBeenCalled();
      expect(component.listOpinions).toEqual(listOpinions);
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
