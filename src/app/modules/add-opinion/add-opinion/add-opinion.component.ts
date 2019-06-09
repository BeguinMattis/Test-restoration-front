import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddOpinion } from '../../../models/add-opinion.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpinionService } from '../../../services/opinion/opinion.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-opinion',
  templateUrl: './add-opinion.component.html',
  styleUrls: ['./add-opinion.component.css']
})
export class AddOpinionComponent implements OnInit {
  mealForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<AddOpinionComponent>,
              @Inject(MAT_DIALOG_DATA) private addOpinion: AddOpinion,
              private formBuilder: FormBuilder,
              private opinionService: OpinionService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.mealForm = this.formBuilder.group({
      starterName: null,
      starterOpinion: null,
      mainCourseName: ['', Validators.required],
      mainCourseOpinion: ['', Validators.required],
      dessertName: null,
      dessertOpinion: null
    });
  }

  cancelMeal(event: any): void {
    event.preventDefault();
    this.matDialogRef.close();
  }

  submitMeal(): void {
    const mealValues: any = this.mealForm.value;
    const body: any = {
      place_id: this.addOpinion.restaurant.place_id,
      starters: [{
        name: mealValues['starterName'],
        opinion: mealValues['starterOpinion']
      }],
      main_courses: [{
        name: mealValues['mainCourseName'],
        opinion: mealValues['mainCourseOpinion']
      }],
      desserts: [{
        name: mealValues['dessertName'],
        opinion: mealValues['dessertOpinion']
      }]
    };
    this.opinionService.addOpinion(body).subscribe((response: any) => {
      // TODO: Display a message for the user
      this.matDialogRef.close();
      }, (error: HttpErrorResponse) => {
      // TODO: Display an alert for the user
      this.matDialogRef.close();
    });
  }
}
