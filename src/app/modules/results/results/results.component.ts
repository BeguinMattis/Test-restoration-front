import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {SearchRestorationService} from '../../../services/search-restoration/search-restoration.service';
import {Restaurant} from '../../../models/restaurant.model';
import {MatDialog} from '@angular/material';
import {AddReviewComponent} from '../../add-review/add-review/add-review.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[];
  private _ngUnsubscribe: Subject<any>;
  restaurantsSubscription: Subscription;
  toto: boolean;

  constructor(private searchRestorationService: SearchRestorationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.toto = false;
    this.restaurants = [];
    this._ngUnsubscribe = new Subject<any>();
    this.searchRestorationService.getRestaurantSubject()
      // .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((restaurants: Restaurant[]) => {
        console.log('ResultsComponent: ' + JSON.stringify(restaurants));
        this.toto = true;
        this.restaurants = restaurants;
      });
  }

  addReview(restaurant: Restaurant): void {
    this.dialog.open(AddReviewComponent, {
      width: '250px',
      data: {restaurant: restaurant}
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
