import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/user-details';
import { Observable } from 'rxjs';

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

  options = {
    headers: new HttpHeaders({
      Accept: 'text/html, application/json',
      'Content-Type': 'application/json',
    }),
  };

  // UI
  getCarouselData(): Observable<any> {
    return this.http.get<any>(this.carouselUrl);
  }

  getEcoData(): Observable<any> {
    return this.http.get<any>(this.ecoUrl)
  }

  //BACK-END
  //AUTH
  register(userData: UserDetails) {
    return this.http.post(this.registerUrl, userData, this.options);
  }

  login(userData: UserDetails) {
    return this.http.post(this.loginUrl, userData, this.options);
  }

}
