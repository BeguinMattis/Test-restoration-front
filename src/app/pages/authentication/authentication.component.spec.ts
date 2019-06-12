import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  const authenticationServiceMock: jasmine.SpyObj<AuthenticationService> =
    jasmine.createSpyObj('AuthenticationService', ['isSignIn', 'signIn']);
  const routerMock: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should create the component if the user is not sign in', () => {
      authenticationServiceMock.isSignIn.and.returnValue(false);
      component.ngOnInit();
      expect(authenticationServiceMock.isSignIn).toHaveBeenCalled();
      expect(component).toBeTruthy();
    });

    it('Should redirect the user to the search page if he is already sign in', () => {
      authenticationServiceMock.isSignIn.and.returnValue(true);
      component.ngOnInit();
      expect(authenticationServiceMock.isSignIn).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['search']);
    });
  });

  describe('signIn', () => {
    it('Should redirect the user to the search page if successful authentication', () => {
      authenticationServiceMock.signIn.and.returnValue(Promise.resolve());
      component.signIn();
      expect(authenticationServiceMock.signIn).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['search']);
    });
  });
});
