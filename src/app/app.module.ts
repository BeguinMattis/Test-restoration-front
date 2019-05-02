import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { getAuthServiceConfig } from './configurations/social-login.config';
import { AuthenticationService } from './services/authentication/authentication.service';
import { SearchComponent } from './pages/search/search.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchRestorationModule } from './modules/search-restoration/search-restoration.module';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { SearchRestorationService } from './services/search-restoration/search-restoration.service';
import { GoogleMapsModule } from './modules/google-maps/google-maps.module';
import { AgmCoreModule } from '@agm/core';
import { ResultsModule } from './modules/results/results.module';
import { environment } from '../environments/environment';
import { BackService } from './services/back/back.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddReviewModule} from './modules/add-review/add-review.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    SearchComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    SocialLoginModule,
    SearchRestorationModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.api_key,
      libraries: [
        'places'
      ]
    }),
    ResultsModule,
    AddReviewModule
  ],
  providers: [
    AuthenticationService,
    GeolocationService,
    SearchRestorationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfig
    },
    BackService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
