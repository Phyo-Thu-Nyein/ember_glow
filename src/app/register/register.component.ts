import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from '../interface/user-details';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  // Subscriptions
  regSub: Subscription = new Subscription();

  @ViewChild('regForm') RegisterForm?: NgForm;
  @ViewChild('passwordField') passwordField?: ElementRef;
  @ViewChild('confirmPasswordField') confirmPasswordField?: ElementRef;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private renderer: Renderer2,
    private loadingService: LoadingService
  ) { }

  //prevent the user from copy/pasting the password
  ngAfterViewInit() {
    if (this.passwordField && this.confirmPasswordField) {
      this.renderer.listen(this.passwordField.nativeElement, 'copy', (event: ClipboardEvent) => {
        event.preventDefault();
      });
      this.renderer.listen(this.confirmPasswordField.nativeElement, 'paste', (event: ClipboardEvent) => {
        event.preventDefault();
      });
    }
  }
  
  onSubmit: boolean = false; //loading animation
  username: string = '';
  email: string = '';
  phone?: number;
  password: string = '';
  conpassword: string = '';

  //Validate the ph no
  phoneNum: number | null = null;
  isPhoneValid: boolean = true;

  validatePhone(phone: number | null) {
    if (phone && phone.toString().length >= 9) {
      this.isPhoneValid = true;
    } else {
      this.isPhoneValid = false;
    }
  }
  onPhoneChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.phoneNum = input ? parseInt(input) : null;
    this.validatePhone(this.phoneNum);
  }

  //Validate the passwords
  passwordsMatch: boolean = true;

  validatePasswords() {
    this.passwordsMatch = this.password === this.conpassword && this.conpassword.length == this.password.length;
  }

  onPasswordChange() {
    this.validatePasswords();
  }

  onConfirmPasswordChange() {
    this.validatePasswords();
  }

  //Turn green if valid else red
  isFieldValid(field: NgModel) {
    return field.valid && (field.touched || field.dirty)
  }
  isFieldInvalid(field: NgModel) {
    return !field.valid && (field.touched || field.dirty)
  }

  //Register
  register() {
    this.onSubmit = true;
    var result = this.apiService.register({
      'name': this.username,
      'email': this.email,
      'phone': this.phone,
      'password': this.password,
    });
    this.regSub = result.subscribe({
      next: (response: UserDetails) => {
        if (response.status == 'success') {
          this.onSubmit = false;
          this.loadingService.showLoading();
          setTimeout(() => {
            this.router.navigateByUrl('login');
          }, 460);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error);
        this.onSubmit = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.regSub) {
      this.regSub.unsubscribe();
    }
  }

}
