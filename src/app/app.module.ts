import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailComponent } from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RoomsComponent } from './rooms/rooms.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { DiningComponent } from './dining/dining.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReceptionComponent } from './reception/reception.component';
import { DiningRestaurantsComponent } from './dining-restaurants/dining-restaurants.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutMissionComponent } from './about-mission/about-mission.component';
import { AboutTeamComponent } from './about-team/about-team.component';
import { AboutReviewsComponent } from './about-reviews/about-reviews.component';
import { AboutEcoComponent } from './about-eco/about-eco.component';
import { FacilitiesDetailComponent } from './facilities-detail/facilities-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
    NotfoundComponent,
    DetailComponent,
    RoomsComponent,
    FacilitiesComponent,
    DiningComponent,
    AboutComponent,
    ContactComponent,
    ReceptionComponent,
    DiningRestaurantsComponent,
    AboutMissionComponent,
    AboutTeamComponent,
    AboutReviewsComponent,
    AboutEcoComponent,
    FacilitiesDetailComponent,
    ProfileComponent,
    AllUsersComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
