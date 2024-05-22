import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/user-details';
import { Observable } from 'rxjs';
import { Carousel } from '../interface/carousel-detail';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private dataUrl = '../../assets/data/carousel-data.json';

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

  getCarouselData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  register(userData: UserDetails) {
    return this.http.post(this.registerUrl, userData, this.options);
  }

  login(userData: UserDetails) {
    return this.http.post(this.loginUrl, userData, this.options);
  }

}
