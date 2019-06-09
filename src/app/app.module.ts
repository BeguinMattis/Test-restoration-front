import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { SearchRestaurantModule } from './modules/search-restaurant/search-restaurant.module';
import { AgmCoreModule } from '@agm/core';
import { AddOpinionModule } from './modules/add-opinion/add-opinion.module';
import { ListOpinionsModule } from './modules/list-opinions/list-opinions.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { MainComponent } from './layout/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { ListComponent } from './pages/list/list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { getAuthServiceConfig } from './configurations/social-login.config';
import { AuthenticationService } from './services/authentication/authentication.service';
import { BackService } from './services/back/back.service';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { RestaurantService } from './services/restaurant/restaurant.service';
import { OpinionService } from './services/opinion/opinion.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    MainComponent,
    SearchComponent,
    ListComponent,
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
    AddOpinionModule,
    ListOpinionsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfig
    },
    AuthenticationService,
    BackService,
    GeolocationService,
    RestaurantService,
    OpinionService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
