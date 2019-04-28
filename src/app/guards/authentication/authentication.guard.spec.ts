import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthenticationGuard', () => {
  const authenticationServiceMock: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj('AuthenticationService', ['isSignIn']);
  const routerMock: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRouteSnapshotMock: jasmine.SpyObj<ActivatedRouteSnapshot> = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString']);
  const routerStateSnapshotMock: jasmine.SpyObj<RouterStateSnapshot> = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: AuthenticationService,
        useValue: authenticationServiceMock
      },
      {
        provide: Router,
        useValue: routerMock
      },
      {
        provide: ActivatedRouteSnapshot,
        useValue: activatedRouteSnapshotMock
      },
      {
        provide: RouterStateSnapshot,
        useValue: routerStateSnapshotMock
      }
    ]
  }));

  describe('constructor', () => {
    it('Should create the service', inject([AuthenticationGuard], (authenticationGuard: AuthenticationGuard) => {
      expect(authenticationGuard).toBeTruthy();
    }));
  });

  describe('canActivate', () => {
    it('Should do nothing if the user is already sign in',
      inject([AuthenticationGuard], (authenticationGuard: AuthenticationGuard) => {
        authenticationServiceMock.isSignIn.and.returnValue(true);
        const result: boolean = authenticationGuard.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock);
        expect(authenticationServiceMock.isSignIn).toHaveBeenCalled();
        expect(result).toBeTruthy();
      })
    );

    it('Should redirect the user to the authentication page if he is not sign in',
      inject([AuthenticationGuard], (authenticationGuard: AuthenticationGuard) => {
        authenticationServiceMock.isSignIn.and.returnValue(false);
        const result: boolean = authenticationGuard.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock);
        expect(authenticationServiceMock.isSignIn).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalledWith(['authentication']);
        expect(result).toBeFalsy();
      })
    );
  });
});
