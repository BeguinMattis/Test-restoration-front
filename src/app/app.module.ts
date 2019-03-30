import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { getAuthServiceConfig } from './configurations/social-login.config';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { SearchRestorationModule } from './modules/search-restoration/search-restoration.module';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { environment } from '../environments/environment';
import { GoogleMapsModule } from './modules/google-maps/google-maps.module';
import { AgmCoreModule } from '@agm/core';
import { SearchRestorationService } from './services/search-restoration/search-restoration.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SearchRestorationModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.api_key,
      libraries: [
        'places'
      ]
    }),
    SocialLoginModule
  ],
  providers: [
    GeolocationService,
    SearchRestorationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfig
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
