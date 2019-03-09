import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

@NgModule({
  declarations: [
    GoogleMapsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoogleMapsComponent
  ]
})
export class GoogleModule { }
