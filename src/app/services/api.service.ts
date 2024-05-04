import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/user-details';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://api-hotel-e271.onrender.com/';

  registerUrl: string = `${this.baseUrl}/api/v1/auth/register/`;
  loginUrl: string = `${this.baseUrl}/api/v1/auth/login/`;

  options = {
    headers: new HttpHeaders({
      Accept: 'text/html, application/json',
      'Content-Type': 'application/json',
    }),
  };

  register(userData: UserDetails) {
    return this.http.post(this.registerUrl, userData, this.options);
  }

  login(userData: UserDetails) {
    return this.http.post(this.loginUrl, userData, this.options);
  }
}
