import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchRestorationModule } from './modules/search-restoration/search-restoration.module';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { environment } from '../environments/environment';
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
    HttpClientModule,
    SearchRestorationModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key,
      libraries: [
        'places'
      ]
    })
  ],
  providers: [
    GeolocationService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
