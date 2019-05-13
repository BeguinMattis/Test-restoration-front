import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
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
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AddOpinionComponent
  ]
})
export class AddOpinionModule { }
