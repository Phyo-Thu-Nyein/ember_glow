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

  @ViewChild('loginForm') RegisterForm?: NgForm;
  constructor(private router: Router, private apiService: ApiService) { }
  
  username: string = '';
  email: string = '';
  phone?: Number;
  password: string = '';
  conpassword: string = '';

  register() {
    var result = this.apiService.register({
      'name': this.username,
      'email': this.email,
      'phone': this.phone,
      'password': this.password,
    });
    result.subscribe({
      next: (response: LoginUser) => {
        if (response.status == 'success') {
          alert(response.status);
          this.router.navigateByUrl('login');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const { message } = err['error'];
        alert(message);
      }
    });
  }

}
