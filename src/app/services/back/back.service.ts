import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) { }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authenticationService.getToken(),
        'Content-Type': 'application/json'
      })
    };
  }

  get<T>(endPoint: string): Observable<T> {
    const url: string = environment.test_restoration.back_api_base_url + endPoint;
    const options = this.getOptions();
    return this.http.get<T>(url, options);
  }

  post<T>(endPoint: string, body: any): Observable<T> {
    const url: string = environment.test_restoration.back_api_base_url + endPoint;
    const options = this.getOptions();
    return this.http.post<T>(url, body, options);
  }

  put<T>(endPoint: string, body: any): Observable<T> {
    const url: string = environment.test_restoration.back_api_base_url + endPoint;
    const options = this.getOptions();
    return this.http.put<T>(url, body, options);
  }

  delete<T>(endPoint: string): Observable<T> {
    const url: string = environment.test_restoration.back_api_base_url + endPoint;
    const options = this.getOptions();
    return this.http.delete<T>(url, options);
  }
}
