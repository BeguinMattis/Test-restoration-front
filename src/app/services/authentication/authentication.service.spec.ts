import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Payload } from '../../models/payload.model';

describe('AuthenticationService', () => {
  const authServiceMock: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['signIn', 'signOut']);
  const routerMock: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: AuthService,
        useValue: authServiceMock
      },
      {
        provide: Router,
        useValue: routerMock
      }
    ]
  }));

  describe('constructor', () => {
    it('Should create the service',
      inject([AuthenticationService], (authenticationService: AuthenticationService) => {
        expect(authenticationService['user']).toBeNull();
        expect(authenticationService).toBeTruthy();
      })
    );
  });

  describe('getToken', () => {
    it('Should get the token', inject([AuthenticationService], (authenticationService: AuthenticationService) => {
      const user: User = {
        family_name: 'family_name',
        given_name: 'given_name',
        email: 'email',
        picture: 'picture',
        token: 'token'
      };
      spyOn(authenticationService, 'getUser').and.returnValue(user);
      const result: string = authenticationService.getToken();
      expect(authenticationService.getUser).toHaveBeenCalled();
      expect(result).toEqual(user.token);
    }));

    it('Should not get the token', inject([AuthenticationService], (authenticationService: AuthenticationService) => {
      const user: User = null;
      spyOn(authenticationService, 'getUser').and.returnValue(user);
      const result: string = authenticationService.getToken();
      expect(authenticationService.getUser).toHaveBeenCalled();
      expect(result).toBeNull();
    }));
  });

  describe('getPayload', () => {
    it('Should get the payload', inject([AuthenticationService], (authenticationService: AuthenticationService) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYjMyZjMwNmVkYzQ1MTQ5N2JhYmQ5NiIsImV4cCI6MTU1NjU0ODAyNiwiaWF0IjoxNTU' +
        '1OTQzMjI2fQ.fB46k8IM4IjMOfeSDFZzFF5vuxhEMNOVu7lx5mcLgpU';
      spyOn(authenticationService, 'getToken').and.returnValue(token);
      const response: Payload = {
        iat: 1555943226,
        id: '5cb32f306edc451497babd96',
        exp: 1556548026
      };
      const result: Payload = authenticationService['getPayload']();
      expect(authenticationService.getToken).toHaveBeenCalled();
      expect(result).toEqual(response);
    }));

    it('Should not get the payload',
      inject([AuthenticationService], (authenticationService: AuthenticationService) => {
        const token: string = null;
        spyOn(authenticationService, 'getToken').and.returnValue(token);
        const result: Payload = authenticationService['getPayload']();
        expect(authenticationService.getToken).toHaveBeenCalled();
        expect(result).toBeNull();
      }));
  });

  describe('isSignIn', () => {
    it('The user is sign in', inject([AuthenticationService], (authenticationService: AuthenticationService) => {
      const payload: Payload = {
        iat: 1555943226,
        id: '5cb32f306edc451497babd96',
        exp: 1556548026
      };
      spyOn<any>(authenticationService, 'getPayload').and.returnValue(payload);
      jasmine.clock().mockDate(new Date((payload.exp * 1000) - 1));
      const result: boolean = authenticationService.isSignIn();
      expect(authenticationService['getPayload']).toHaveBeenCalled();
      expect(result).toBeTruthy();
    }));

    it('The user is no longer sign in',
      inject([AuthenticationService], (authenticationService: AuthenticationService) => {
        const payload: Payload = {
          iat: 1555943226,
          id: '5cb32f306edc451497babd96',
          exp: 1556548026
        };
        spyOn<any>(authenticationService, 'getPayload').and.returnValue(payload);
        jasmine.clock().mockDate(new Date((payload.exp * 1000) + 1));
        const result: boolean = authenticationService.isSignIn();
        expect(authenticationService['getPayload']).toHaveBeenCalled();
        expect(result).toBeFalsy();
      })
    );

    it('The user is not sign in', inject([AuthenticationService], (authenticationService: AuthenticationService) => {
      const payload: Payload = null;
      spyOn<any>(authenticationService, 'getPayload').and.returnValue(payload);
      const result: boolean = authenticationService.isSignIn();
      expect(authenticationService['getPayload']).toHaveBeenCalled();
      expect(result).toBeFalsy();
    }));
  });
});
