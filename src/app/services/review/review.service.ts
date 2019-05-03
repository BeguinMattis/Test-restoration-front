import { Injectable } from '@angular/core';
import {BackService} from '../back/back.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private backService: BackService) { }

  addReview(body: any) {
    console.log('addReview');
    return this.backService.post(environment.test_restoration.review_add_resource_path, body);
  }
}
