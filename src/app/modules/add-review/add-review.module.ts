import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review/add-review.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AddReviewComponent
  ],
  entryComponents: [
    AddReviewComponent
  ]
})
export class AddReviewModule { }
