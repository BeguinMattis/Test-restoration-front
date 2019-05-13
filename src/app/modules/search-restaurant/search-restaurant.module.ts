import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { SearchRestaurantComponent } from './search-restaurant/search-restaurant.component';

@NgModule({
  declarations: [
    SearchRestaurantComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule
  ],
  exports: [
    SearchRestaurantComponent
  ]
})
export class SearchRestaurantModule { }
