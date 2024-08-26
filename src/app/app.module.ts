import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RoomsComponent } from './components/rooms/rooms.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { DiningComponent } from './components/dining/dining.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DiningRestaurantsComponent } from './components/dining/dining-restaurants/dining-restaurants.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutMissionComponent } from './components/about/about-mission/about-mission.component';
import { AboutTeamComponent } from './components/about/about-team/about-team.component';
import { AboutReviewsComponent } from './components/about/about-reviews/about-reviews.component';
import { AboutEcoComponent } from './components/about/about-eco/about-eco.component';
import { FacilitiesDetailComponent } from './components/facilities/facilities-detail/facilities-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllUsersComponent } from './components/manager/all-users/all-users.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { PaymentComponent } from './components/rooms/payment/payment.component';
import { BookingsComponent } from './components/profile/bookings/bookings.component';
import { AllBookingsComponent } from './components/manager/all-bookings/all-bookings.component';
import { UpdateBookingComponent } from './components/manager/update-booking/update-booking.component';
import { UpdateRoomComponent } from './components/manager/update-room/update-room.component';
import { AllRoomsComponent } from './components/manager/all-rooms/all-rooms.component';
import { CreateRoomComponent } from './components/manager/create-room/create-room.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingDirective } from './directives/loading.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { InvoiceDashboardComponent } from './components/manager/invoice-dashboard/invoice-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { AllInvoicesComponent } from './components/manager/all-invoices/all-invoices.component';
import { CreateInvoiceComponent } from './components/manager/create-invoice/create-invoice.component';
import { InvoiceDetailsComponent } from './components/manager/invoice-details/invoice-details.component';
import { PreCreateInvoiceComponent } from './components/manager/pre-create-invoice/pre-create-invoice.component';
import { TokenExpiredDialogComponent } from './components/token-expired-dialog/token-expired-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';

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
    InvoiceDashboardComponent,
    AllInvoicesComponent,
    CreateInvoiceComponent,
    InvoiceDetailsComponent,
    PreCreateInvoiceComponent,
    TokenExpiredDialogComponent,
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
    NgSelectModule,
    NgChartsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
