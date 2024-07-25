import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails, UserData } from '../interface/user-details';
import { Observable } from 'rxjs';
import { AllUsersDetails } from '../interface/allusers-detail';
import { ProfileDetails } from '../interface/profile-details';
import { AllRoomsDetails } from '../interface/allrooms-detail';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseDataUrl = '../../assets/data/';
  private carouselUrl: string = `${this.baseDataUrl}facilities-carousel-data.json`;
  private ecoUrl: string = `${this.baseDataUrl}about-eco-data.json`;

  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://hotel-api-v2-ocur.onrender.com';

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
  allRoomsUrl: string = `${this.baseUrl}/api/v1/rooms/all-rooms`;
  getOneRoomUrl: string = `${this.baseUrl}/api/v1/rooms/one-room`;
  // POST, PATCH, DELETE ROOMS will come later

  // Booking related URLS
  allBookingsUrl: string = `${this.baseUrl}/api/v1/bookings/all`;
  myBookingsUrl: string = `${this.baseUrl}/api/v1/bookings/my`;
  oneBookingUrl: string = `${this.baseUrl}/api/v1/bookings/one`;
  newBookingUrl: string = `${this.baseUrl}/api/v1/bookings/new`;
  updateBookingUrl: string = `${this.baseUrl}/api/v1/bookings/update`;
  cancelBookingUrl: string = `${this.baseUrl}/api/v1/bookings/cancel`;
  archiveBookingUrl: string = `${this.baseUrl}/api/v1/bookings/archive`;

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

  //BACK-END
  //AUTH
  register(userData: UserData) {
    return this.http.post(this.registerUrl, userData, this.options);
  }
  login(userData: UserData) {
    return this.http.post(this.loginUrl, userData, this.options);
  }

  // USER SECTION
  //Get user profile
  getUserProfile(): Observable<ProfileDetails> {
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

  // ROOM SECTION
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

  // BOOKING SECTION
  // Get all bookings
  getAllBookings() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.allBookingsUrl}`, { headers });
  }
  // Get my bookings
  getMyBookings() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.myBookingsUrl}`, { headers });
  }
  // Get one booking
  getOneBooking() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.oneBookingUrl}`, { headers });
  }
  // Create a new booking
  createNewBooking(roomId: string, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.newBookingUrl}/${roomId}`, formData, { headers });
  }
  // Update the booking
  updateBooking(bookingId: string) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.updateBookingUrl}/${bookingId}`, { headers });
  }
  // Cancel the booking
  cancelBooking(bookingId: string) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.cancelBookingUrl}/${bookingId}`, { headers });
  }
  // Archive the booking (soft delete)
  archiveBooking(bookingId: string) {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.archiveBookingUrl}/${bookingId}`, { headers });
  }

}
