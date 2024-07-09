import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginUser } from '../interface/login-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm?: NgForm;
  constructor(private router: Router, private apiService: ApiService) { }
  
  email: string = '';
  password: string = '';

  login() {
    console.log('form submitted');
    const loginPayLoad = {
      email: this.email,
      password: this.password,
    };

    this.apiService.login(loginPayLoad).subscribe({
      next: (response: LoginUser) => {
        if (response.status == 'login success') { //api responded with login success
          localStorage.setItem('token', response.accessToken!);
          alert(response.status);
          this.router.navigateByUrl('rooms');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const { message } = err.error;
        alert(message);
      }
    });
  }

}
