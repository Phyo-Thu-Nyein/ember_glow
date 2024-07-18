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
  // POST, PATCH, DELETE ROOMS will come later

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
    const headers = this.getAuthHeaders();
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        queryParams = queryParams.append(key, params[key]);
      }
    });
    const options = { headers: headers, params: queryParams };
    return this.http.get(this.allRoomsUrl, options);
  }
}
