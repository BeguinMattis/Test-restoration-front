import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOpinionComponent } from './add-opinion/add-opinion.component';

@NgModule({
  declarations: [
    AddOpinionComponent
  ],
  entryComponents: [
    AddOpinionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddOpinionComponent
  ]
})
export class AddOpinionModule { }
