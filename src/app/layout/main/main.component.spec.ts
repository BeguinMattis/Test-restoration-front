import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../../models/user.model';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  const authenticationServiceMock: jasmine.SpyObj<AuthenticationService> =
    jasmine.createSpyObj('AuthenticationService', ['getUser', 'signOut']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should create the component', () => {
      const user: User = {
        family_name: 'family_name',
        given_name: 'given_name',
        email: 'email',
        picture: 'picture',
        token: 'token'
      };
      authenticationServiceMock.getUser.and.returnValue(user);
      fixture.detectChanges();
      component.ngOnInit();
      expect(authenticationServiceMock.getUser).toHaveBeenCalled();
      expect(component.user).toEqual(user);
      expect(component).toBeTruthy();
    });
  });

  describe('signOut', () => {
    it('Should call the signOut method of the AuthenticationService', () => {
      component.signOut();
      expect(authenticationServiceMock.signOut).toHaveBeenCalled();
    });
  });
});
