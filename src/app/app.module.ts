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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RoomsComponent } from './rooms/rooms.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { DiningComponent } from './dining/dining.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DiningRestaurantsComponent } from './dining/dining-restaurants/dining-restaurants.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutMissionComponent } from './about/about-mission/about-mission.component';
import { AboutTeamComponent } from './about/about-team/about-team.component';
import { AboutReviewsComponent } from './about/about-reviews/about-reviews.component';
import { AboutEcoComponent } from './about/about-eco/about-eco.component';
import { FacilitiesDetailComponent } from './facilities/facilities-detail/facilities-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { AllUsersComponent } from './manager/all-users/all-users.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { PaymentComponent } from './rooms/payment/payment.component';
import { BookingsComponent } from './profile/bookings/bookings.component';
import { AllBookingsComponent } from './manager/all-bookings/all-bookings.component';
import { UpdateBookingComponent } from './manager/update-booking/update-booking.component';
import { UpdateRoomComponent } from './manager/update-room/update-room.component';
import { AllRoomsComponent } from './manager/all-rooms/all-rooms.component';
import { CreateRoomComponent } from './manager/create-room/create-room.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingDirective } from './directives/loading.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
    NotfoundComponent,
    RoomsComponent,
    FacilitiesComponent,
    DiningComponent,
    AboutComponent,
    ContactComponent,
    DiningRestaurantsComponent,
    AboutMissionComponent,
    AboutTeamComponent,
    AboutReviewsComponent,
    AboutEcoComponent,
    FacilitiesDetailComponent,
    ProfileComponent,
    AllUsersComponent,
    RoomDetailsComponent,
    PaymentComponent,
    BookingsComponent,
    AllBookingsComponent,
    UpdateBookingComponent,
    UpdateRoomComponent,
    AllRoomsComponent,
    CreateRoomComponent,
    LoadingComponent,
    LoadingDirective,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
