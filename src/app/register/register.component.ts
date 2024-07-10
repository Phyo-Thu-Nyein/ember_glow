import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterUser } from '../interface/register-details';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('regForm') RegisterForm?: NgForm;
  constructor(private router: Router, private apiService: ApiService) { }
  
  onSubmit: boolean = false; //loading animation
  username: string = '';
  email: string = '';
  phone?: Number;
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
    this.passwordsMatch = this.password === this.conpassword;
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
    result.subscribe({
      next: (response: RegisterUser) => {
        if (response.status == 'success') {
          this.onSubmit = false;
          alert(response.status);
          this.router.navigateByUrl('login');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error);
        this.onSubmit = false;
      }
    });
  }

}
