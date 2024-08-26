import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserDetails,
  UserData,
  RegisterData,
  LoginData,
} from '../interface/user-details';
import { Observable } from 'rxjs';
import { AllUsersDetails } from '../interface/allusers-detail';
import { AllRoomsDetails } from '../interface/allrooms-detail';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseDataUrl = '../../assets/data/';
  private carouselUrl: string = `${this.baseDataUrl}facilities-carousel-data.json`;
  private ecoUrl: string = `${this.baseDataUrl}about-eco-data.json`;
  private countryCodeUrl: string = `${this.baseDataUrl}country-codes.json`;

  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://hotel-api-v2-ocur.onrender.com'; // Production URL
  // baseUrl: string = 'http://localhost:8000'; // Development URL

  // Auth URL
  authUrl: string = `${this.baseUrl}/api/v1/auth/`;
  jsonOptions = {
    headers: new HttpHeaders({
      Accept: 'text/html, application/json',
      'Content-Type': 'application/json',
    }),
  };

  // User URL
  usersUrl: string = `${this.baseUrl}/api/v1/users`;

  // Room URL
  roomsUrl: string = `${this.baseUrl}/api/v1/rooms`;

  // Booking URL
  bookingsUrl: string = `${this.baseUrl}/api/v1/bookings`;

  // Invoice URL
  invoicesUrl: string = `${this.baseUrl}/api/v1/invoices`;

  //Authorization
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // -------------- FRONT-END ----------------
  getCarouselData(): Observable<any> {
    return this.http.get<any>(this.carouselUrl);
  }
  getEcoData(): Observable<any> {
    return this.http.get<any>(this.ecoUrl);
  }
  getCountryCodes(): Observable<any> {
    return this.http.get<any>(this.countryCodeUrl);
  }

  //--------------- BACK-END -----------------
  //AUTH (Registration/ Login)
  register(registerData: RegisterData) {
    return this.http.post(
      `${this.authUrl}/register`,
      registerData,
      this.jsonOptions
    );
  }
  login(loginData: LoginData) {
    return this.http.post(`${this.authUrl}/login`, loginData, this.jsonOptions);
  }

  // ------ USER SECTION -------
  //Get user profile
  getUserProfile(): Observable<UserDetails> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.usersUrl}/me`, { headers });
  }
  //Get all users for manager role (1)
  getAllUsers(params: any): Observable<AllUsersDetails> {
    const headers = this.getAuthHeaders();
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams };
    return this.http.get(`${this.usersUrl}/all`, options);
  }
  //Upload profile pic
  uploadPfp(formData: FormData): Observable<UserDetails> {
    const headers = this.getAuthHeaders();
    return this.http.post<UserDetails>(`${this.usersUrl}/upload-pfp`, formData, {
      headers,
    });
  }
  //Update User Info in profile page
  updateUserInfo(userData: UserData): Observable<UserDetails> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.usersUrl}/update-info`, userData, {
      headers,
    });
  }
  // Update User Role
  updateUserRole(userId: string, role: number) {
    const headers = this.getAuthHeaders();
    const body = { role };
    return this.http.patch(`${this.usersUrl}/${userId}/update-role`, body, { headers });
  }
  // Update Password
  updatePsw(payload: { oldPassword: string; newPassword: string }) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.usersUrl}/update-psw`, payload, { headers });
  }
  // Delete User by ID
  deleteUserById(userId: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.usersUrl}/${userId}/delete`, { headers });
  }

  // ------ ROOM SECTION -------
  // Get all rooms (with sorting, filtering, pagination)
  getAllRooms(params: any): Observable<AllRoomsDetails> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { params: queryParams };
    return this.http.get(`${this.roomsUrl}/all`, options);
  }
  // Get one room
  getRoomById(roomId: string) {
    return this.http.get(`${this.roomsUrl}/${roomId}`);
  }
  // Create new room
  createRoom(formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.roomsUrl}/new`, formData, { headers });
  }
  // Update room by id
  updateRoomById(roomId: string, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.roomsUrl}/${roomId}/update`, formData, {
      headers,
    });
  }
  // Delete room by id
  deleteRoomById(roomId: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.roomsUrl}/${roomId}/delete`, { headers });
  }

  // ----- BOOKING SECTION ------
  // Get all bookings
  getAllBookings(params: any) {
    let queryParams = new HttpParams();
    const headers = this.getAuthHeaders();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams };
    return this.http.get(`${this.bookingsUrl}/all`, options);
  }
  // Get my bookings
  getMyBookings(params: any) {
    let queryParams = new HttpParams();
    const headers = this.getAuthHeaders();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams };
    return this.http.get(`${this.bookingsUrl}/my`, options);
  }
  // Get one booking
  getOneBooking(bookingId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.bookingsUrl}/${bookingId}`, { headers });
  }
  // Get booked dates
  getBookedDates(roomId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.bookingsUrl}/${roomId}/booked-dates`, {
      headers,
    });
  }
  // Create a new booking
  createNewBooking(roomId: string, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.bookingsUrl}/${roomId}/new`, formData, {
      headers,
    });
  }
  // Update the booking
  updateBooking(bookingId: string, bookingData: any) {
    const headers = this.getAuthHeaders();
    return this.http.patch(
      `${this.bookingsUrl}/${bookingId}/update`,
      bookingData,
      { headers }
    );
  }
  
  // ------- INVOICE SECTION -------
  // Get all invoices
  getAllInvoices(params: any) {
    let queryParams = new HttpParams();
    const headers = this.getAuthHeaders();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams };
    return this.http.get(`${this.invoicesUrl}/all`, options);
  }
  // Get invoice report
  getInvoiceReport() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.invoicesUrl}/report`, { headers });
  }
  // Get one invoice
  getOneInvoice(invoiceId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.invoicesUrl}/${invoiceId}`, { headers });
  }
  // Validate the booking ID 
  validateBookingId(bookingId: string) {
    const headers = this.getAuthHeaders();
    const body = { bookingId }
    return this.http.post(`${this.invoicesUrl}/validate-bookingId`, body, { headers });
  }
  // Create an invoice
  createInvoice(bookingId: string, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.invoicesUrl}/${bookingId}/new`, formData, { headers });
  }
}