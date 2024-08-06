import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails, UserData, RegisterData, LoginData } from '../interface/user-details';
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
  baseUrl: string = 'https://hotel-api-v2-ocur.onrender.com';
  // baseUrl: string = 'http://localhost:8000';

  // User related URLs
  registerUrl: string = `${this.baseUrl}/api/v1/auth/register/`;
  loginUrl: string = `${this.baseUrl}/api/v1/auth/login/`;
  profileUrl: string = `${this.baseUrl}/api/v1/users/me`;
  allUsersUrl: string = `${this.baseUrl}/api/v1/users/all-users`;
  pfpUploadUrl: string = `${this.baseUrl}/api/v1/users/upload-pfp`;
  userInfoUpdateUrl: string = `${this.baseUrl}/api/v1/users/update-user-info`;
  updatePswUrl: string = `${this.baseUrl}/api/v1/users/update-user-psw`
  deleteUserUrl: string = `${this.baseUrl}/api/v1/users/delete-user`;

  // Room related URLs
  allRoomsUrl: string = `${this.baseUrl}/api/v1/rooms/all`;
  getOneRoomUrl: string = `${this.baseUrl}/api/v1/rooms/one`;
  newRoomUrl: string = `${this.baseUrl}/api/v1/rooms/new`;
  updateRoomUrl: string = `${this.baseUrl}/api/v1/rooms/update`;
  deleteRoomUrl: string = `${this.baseUrl}/api/v1/rooms/delete`;

  // Booking related URLS
  allBookingsUrl: string = `${this.baseUrl}/api/v1/bookings/all`;
  myBookingsUrl: string = `${this.baseUrl}/api/v1/bookings/my`;
  oneBookingUrl: string = `${this.baseUrl}/api/v1/bookings/one`;
  bookedDatesUrl: string = `${this.baseUrl}/api/v1/bookings/booked-dates`;
  newBookingUrl: string = `${this.baseUrl}/api/v1/bookings/new`;
  updateBookingUrl: string = `${this.baseUrl}/api/v1/bookings/update`;

  options = {
    headers: new HttpHeaders({
      Accept: 'text/html, application/json',
      'Content-Type': 'application/json',
    }),
  };

  //Authorization
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // UI
  getCarouselData(): Observable<any> {
    return this.http.get<any>(this.carouselUrl);
  }
  getEcoData(): Observable<any> {
    return this.http.get<any>(this.ecoUrl);
  }
  getCountryCodes(): Observable<any> {
    return this.http.get<any>(this.countryCodeUrl);
  }

  //BACK-END
  //AUTH
  register(registerData: RegisterData) {
    return this.http.post(this.registerUrl, registerData, this.options);
  }
  login(loginData: LoginData) {
    return this.http.post(this.loginUrl, loginData, this.options);
  }

  // --------- USER SECTION ------------
  //Get user profile
  getUserProfile(): Observable<UserDetails> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.profileUrl, { headers });
  }
  //Get all users for manager role (1)
  getAllUsers(params: any): Observable<AllUsersDetails> {
    const headers = this.getAuthHeaders();
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams };
    return this.http.get(this.allUsersUrl, options);
  }
  //Upload profile pic
  uploadPfp(formData: FormData): Observable<UserDetails> {
    const headers = this.getAuthHeaders();
    return this.http.post<UserDetails>(this.pfpUploadUrl, formData, { headers });
  }
  //Update User Info in profile page
  updateUserInfo(userData: UserData): Observable<UserDetails> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.userInfoUpdateUrl}`, userData, { headers });
  }
  // Update Password
  updatePsw(payload: { oldPassword: string;  newPassword: string}) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.updatePswUrl}`, payload, { headers });
  }
  // Delete User by ID
  deleteUserById(userId: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.deleteUserUrl}/${userId}`, { headers });
  }

  // --------- ROOM SECTION ------------
  // Get all rooms (with sorting, filtering, pagination)
  getAllRooms(params: any): Observable<AllRoomsDetails> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { params: queryParams };
    return this.http.get(this.allRoomsUrl, options);
  }
  // Get one room
  getRoomById(roomId: string) {
    return this.http.get(`${this.getOneRoomUrl}/${roomId}`);
  }
  // Create new room
  createRoom(formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.newRoomUrl}`, formData, { headers });
  }
  // Update room by id
  updateRoomById(roomId: string, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.updateRoomUrl}/${roomId}`, formData, {headers});
  }
  // Delete room by id
  deleteRoomById(roomId: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.deleteRoomUrl}/${roomId}`, {headers});
  }

  // --------- BOOKING SECTION ------------
  // Get all bookings
  getAllBookings(params: any) {
    let queryParams = new HttpParams();
    const headers = this.getAuthHeaders();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams }
    return this.http.get(`${this.allBookingsUrl}`, options);
  }
  // Get my bookings
  getMyBookings(params: any) {
    let queryParams = new HttpParams();
    const headers = this.getAuthHeaders();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams }
    return this.http.get(`${this.myBookingsUrl}`, options);
  }
  // Get one booking
  getOneBooking(bookingId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.oneBookingUrl}/${bookingId}`, { headers });
  }
  // Get booked dates
  getBookedDates(roomId: string) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.bookedDatesUrl}/${roomId}`, { headers });
  }
  // Create a new booking
  createNewBooking(roomId: string, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.newBookingUrl}/${roomId}`, formData, { headers });
  }
  // Update the booking
  updateBooking(bookingId: string, bookingData: any) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.updateBookingUrl}/${bookingId}`, bookingData, { headers });
  }

}
