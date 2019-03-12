import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRestorationComponent } from './search-restoration/search-restoration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchRestorationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchRestorationComponent
  ]
})
export class SearchModule { }
