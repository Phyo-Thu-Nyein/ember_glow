import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from 'src/app/interface/user-details';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  // Subscriptions
  loginSub: Subscription = new Subscription();

  // Variables
  isLoginError: boolean = false;
  errorMessage: string = '';
  onSubmit: boolean = false; //loading animation
  email: string = '';
  password: string = '';

  @ViewChild('loginForm') loginForm?: NgForm;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}


  //Turn green if valid else red
  isFieldValid(field: NgModel) {
    return field.valid && (field.touched || field.dirty);
  }
  isFieldInvalid(field: NgModel) {
    return !field.valid && (field.touched || field.dirty);
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
    this.loginSub = result.subscribe({
      next: (response: UserDetails) => {
        if (response.status == 'success') {
          //api responded with login success
          localStorage.setItem('token', response.accessToken!);
          localStorage.setItem('role', response.data?.role?.toString()!);
          localStorage.setItem('pfp', response.data?.profilePicture!);
          this.onSubmit = false;

          // Redirect based on user's role
          const userRole = response.data?.role;
          if (userRole === 1 || userRole === 2) {
            this.router.navigateByUrl('dashboard');
          } else {
            // Get the last page's url from query params or default route to 'rooms'
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || 'rooms';
            this.loadingService.showLoading();
            setTimeout(() => {
              this.router.navigateByUrl(returnUrl);
            }, 460);
          }

        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoginError = true;
        this.errorMessage = err.error.message;
        this.onSubmit = false;
        setTimeout(() => {
          this.isLoginError = false;
        }, 3400);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
