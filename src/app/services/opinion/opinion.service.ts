import { Injectable } from '@angular/core';
import { BackService } from '../back/back.service';
import { Observable } from 'rxjs';
import { ListOpinions } from '../../models/list-opinions.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private backService: BackService) { }

  getOpinions(): Observable<ListOpinions> {
    return this.backService.get<ListOpinions>(environment.test_restoration.opinion_list);
  }

  addOpinion(opinion: any): Observable<any> {
    return this.backService.post<any>(environment.test_restoration.opinion_add, opinion);
  }
}
