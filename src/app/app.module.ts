import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './modules/search/search.module';
import { GoogleModule } from './modules/google/google.module';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './services/map.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule,
    GoogleModule,
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
