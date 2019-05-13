import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { SearchRestaurantModule } from './modules/search-restaurant/search-restaurant.module';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AddOpinionModule } from './modules/add-opinion/add-opinion.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { getAuthServiceConfig } from './configurations/social-login.config';
import { AuthenticationService } from './services/authentication/authentication.service';
import { BackService } from './services/back/back.service';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { SearchRestaurantService } from './services/search-restaurant/search-restaurant.service';
import { OpinionService } from './services/opinion/opinion.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    HeaderComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    SocialLoginModule,
    SearchRestaurantModule,
    AgmCoreModule.forRoot({
      apiKey: environment.api_key,
      libraries: [
        'places'
      ]
    }),
    AddOpinionModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfig
    },
    AuthenticationService,
    BackService,
    GeolocationService,
    SearchRestaurantService,
    OpinionService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
