import { Injectable } from '@angular/core';
import { BackService } from '../back/back.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private backService: BackService) { }

  getOpinions(): Observable<any> {
    return this.backService.get<any>(environment.test_restoration.opinion_list);
  }

  addOpinion(opinion: any): Observable<any> {
    return this.backService.post<any>(environment.test_restoration.opinion_add, opinion);
  }
}
