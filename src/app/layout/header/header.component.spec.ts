import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const authenticationServiceMock: jasmine.SpyObj<AuthenticationService> =
    jasmine.createSpyObj('AuthenticationService', ['getUser', 'signOut']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
