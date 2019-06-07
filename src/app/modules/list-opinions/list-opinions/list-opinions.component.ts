import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListOpinions } from '../../../models/list-opinions.model';
import { Subject } from 'rxjs';
import { OpinionService } from '../../../services/opinion/opinion.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-opinions',
  templateUrl: './list-opinions.component.html',
  styleUrls: ['./list-opinions.component.css']
})
export class ListOpinionsComponent implements OnInit, OnDestroy {
  listOpinions: ListOpinions;
  private _ngUnsubscribe: Subject<any>;

  constructor(private opinionService: OpinionService) { }

  ngOnInit() {
    this._ngUnsubscribe = new Subject<any>();
    this.opinionService.getOpinions()
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((listOpinions: ListOpinions) => {
        this.listOpinions = listOpinions;
      }, ((error: HttpErrorResponse) => {
        console.error('Error: ' + error);
        const errorMessage = 'Back-end opinion list API returned an error!';
        // TODO: Display an alert for the user
      }));
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
