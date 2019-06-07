import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ListOpinionsComponent } from './list-opinions/list-opinions.component';

@NgModule({
  declarations: [
    ListOpinionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListOpinionsComponent
  ]
})
export class ListOpinionsModule { }
