import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchRestorationModule } from './modules/search-restoration/search-restoration.module';
import { GoogleMapsModule } from './modules/google-maps/google-maps.module';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './services/map/map.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchRestorationModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_API_KEY',
      libraries: [
        'places'
      ]
    })
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
