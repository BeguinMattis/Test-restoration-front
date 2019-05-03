import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Restaurant} from '../../../models/restaurant.model';
import {ReviewService} from '../../../services/review/review.service';

export interface DialogData {
  restaurant: Restaurant;
}

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  menuForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private formBuilder: FormBuilder,
              private reviewServices: ReviewService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.menuForm = this.formBuilder.group({
      entreeName: ['', Validators.required],
      entreeAvis: ['', Validators.required],
      platName: ['', Validators.required],
      platAvis: ['', Validators.required],
      dessertName: ['', Validators.required],
      dessertAvis: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitForm() {
    console.log('onSubmitForm');
    const formValue = this.menuForm.value;
    const body = {
      places_id: this.data.restaurant.id,
      entreeName: formValue['entreeName'],
      entreeAvis: formValue['entreeAvis'],
      platName: formValue['platName'],
      platAvis: formValue['platAvis'],
      dessertName: formValue['dessertName'],
      dessertAvis: formValue['dessertAvis']
    };
    this.reviewServices.addReview(body).subscribe(() => {
      console.log('next');
      this.dialogRef.close();
    }, (error) => {
      console.log(error);
      console.log('error');
      this.dialogRef.close();
    }, () => {
      console.log('complete');
      this.dialogRef.close();
    });
  }
}
