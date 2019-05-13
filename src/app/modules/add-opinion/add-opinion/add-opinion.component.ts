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
      starterName: '',
      starterOpinion: '',
      mainCourseName: ['', Validators.required],
      mainCourseOpinion: ['', Validators.required],
      dessertName: '',
      dessertOpinion: '',
    });
  }

  cancelMeal(event: any): void {
    event.preventDefault();
    this.matDialogRef.close();
  }

  submitMeal(): void {
    const mealValues: any = this.mealForm.value;
    const body: any = {
      mainCourseName: mealValues['mainCourseName'],
      mainCourseOpinion: mealValues['mainCourseOpinion']
    };
    this.opinionService.addOpinion(body).subscribe((response: any) => {
      this.matDialogRef.close();
      }, (error: HttpErrorResponse) => {
      this.matDialogRef.close();
    });
  }
}
