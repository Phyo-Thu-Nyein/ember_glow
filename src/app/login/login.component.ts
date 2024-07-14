import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from '../interface/user-details';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  // Subscriptions
  loginSub: Subscription = new Subscription();

  @ViewChild('loginForm') loginForm?: NgForm;
  constructor(private router: Router, private apiService: ApiService) {}

  onSubmit: boolean = false; //loading animation
  email: string = '';
  password: string = '';

  //Turn green if valid else red
  isFieldValid(field: NgModel) {
    return field.valid && (field.touched || field.dirty)
  }
  isFieldInvalid(field: NgModel) {
    return !field.valid && (field.touched || field.dirty)
  }

  //Login
  login() {
    console.log('form submitted');
    this.onSubmit = true;
    const loginPayLoad = {
      email: this.email,
      password: this.password,
    };
    var result = this.apiService.login(loginPayLoad);
    this.loginSub = result
    .subscribe({
      next: (response: UserDetails) => {
        if (response.status == 'success') {
          //api responded with login success
          localStorage.setItem('token', response.accessToken!);
          this.onSubmit = false;
          // alert(response.status);
          this.router.navigateByUrl('rooms');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error.message);
        this.onSubmit = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
