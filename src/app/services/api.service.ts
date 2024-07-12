import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/user-details';
import { Observable } from 'rxjs';
import { MyProfileDetail } from '../interface/profile-detail';
import { AllUsers } from '../interface/allusers-detail';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseDataUrl = '../../assets/data/';
  private carouselUrl: string = `${this.baseDataUrl}facilities-carousel-data.json`;
  private ecoUrl: string = `${this.baseDataUrl}about-eco-data.json`;

  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://hotel-api-v2-ocur.onrender.com';

  registerUrl: string = `${this.baseUrl}/api/v1/auth/register/`;
  loginUrl: string = `${this.baseUrl}/api/v1/auth/login/`;
  profileUrl: string = `${this.baseUrl}/api/v1/users/me`;
  allUsersUrl: string = `${this.baseUrl}/api/v1/users/all-users`;
  pfpUploadUrl: string = `${this.baseUrl}/api/v1/upload-pfp`;

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
  register(userData: UserDetails) {
    return this.http.post(this.registerUrl, userData, this.options);
  }
  login(userData: UserDetails) {
    return this.http.post(this.loginUrl, userData, this.options);
  }

  //Get user profile
  getUserProfile(): Observable<MyProfileDetail> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.profileUrl, { headers });
  }

  //Get all users for manager role (1)
  getAllUsers(): Observable<AllUsers> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.allUsersUrl, { headers });
  }

  //Upload profile pic
  uploadPfp(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.pfpUploadUrl, formData, { headers });
  }
}
