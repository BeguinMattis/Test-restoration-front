import { TestBed, inject } from '@angular/core/testing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../authentication/authentication.service';
import { BackService } from './back.service';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('BackService', () => {
  const authenticationServiceMock: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj('AuthenticationService', ['getToken']);
  let options = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    })
  };
  const endPoint = '/end-point';
  const body: any = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: AuthenticationService,
        useValue: authenticationServiceMock
      }
    ]
  }));

  describe('constructor', () => {
    it('Should create the service', inject([BackService], (backService: BackService) => {
      expect(backService).toBeTruthy();
    }));
  });

  describe('getOptions', () => {
    it('Should get the HTTP header which includes a token', inject([BackService], (backService: BackService) => {
      const token = 'token';
      authenticationServiceMock.getToken.and.returnValue(token);
      options = backService['getOptions']();
      expect(authenticationServiceMock.getToken).toHaveBeenCalled();
      expect(options.headers.get('authorization')).toEqual('Bearer ' + token);
    }));
  });

  describe('get', () => {
    it('Should make a HTTP GET request',
      inject([BackService, HttpClient], (backService: BackService, httpClient: HttpClient) => {
        spyOn<any>(backService, 'getOptions').and.returnValue(options);
        spyOn(httpClient, 'get').and.returnValue(of({}));
        backService.get(endPoint).subscribe();
        expect(backService['getOptions']).toHaveBeenCalled();
        const url = environment.test_restoration.back_api_base_url + endPoint;
        expect(httpClient.get).toHaveBeenCalledWith(url, options);
      })
    );
  });

  describe('post', () => {
    it('Should make a HTTP POST request',
      inject([BackService, HttpClient], (backService: BackService, httpClient: HttpClient) => {
        spyOn<any>(backService, 'getOptions').and.returnValue(options);
        spyOn(httpClient, 'post').and.returnValue(of({}));
        backService.post(endPoint, body).subscribe();
        expect(backService['getOptions']).toHaveBeenCalled();
        const url = environment.test_restoration.back_api_base_url + endPoint;
        expect(httpClient.post).toHaveBeenCalledWith(url, body, options);
      })
    );
  });

  describe('put', () => {
    it('Should make a HTTP PUT request',
      inject([BackService, HttpClient], (backService: BackService, httpClient: HttpClient) => {
        spyOn<any>(backService, 'getOptions').and.returnValue(options);
        spyOn(httpClient, 'put').and.returnValue(of({}));
        backService.put(endPoint, body).subscribe();
        expect(backService['getOptions']).toHaveBeenCalled();
        const url = environment.test_restoration.back_api_base_url + endPoint;
        expect(httpClient.put).toHaveBeenCalledWith(url, body, options);
      })
    );
  });

  describe('delete', () => {
    it('Should make a HTTP DELETE request',
      inject([BackService, HttpClient], (backService: BackService, httpClient: HttpClient) => {
        spyOn<any>(backService, 'getOptions').and.returnValue(options);
        spyOn(httpClient, 'delete').and.returnValue(of({}));
        backService.delete(endPoint).subscribe();
        expect(backService['getOptions']).toHaveBeenCalled();
        const url = environment.test_restoration.back_api_base_url + endPoint;
        expect(httpClient.delete).toHaveBeenCalledWith(url, options);
      })
    );
  });
});
