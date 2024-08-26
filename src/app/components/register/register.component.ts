import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from 'src/app/interface/user-details';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})
export class RegisterComponent implements OnInit, OnDestroy {

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

  isRegError: boolean = false; // register error
  errorMsg: string = '';

  // Oninit
  ngOnInit(): void {
    this.loadCountryCodes();
  }
  // Load country codes from the JSON file
  countryCodes: any[] = [];
  selectedCountryCode: string = '+95'; // Default selection

  loadCountryCodes() {
    const result = this.apiService.getCountryCodes().subscribe({
      next: (response) => {
        this.countryCodes = response;
        // Set the default country code to the first item in the array
        if (this.countryCodes.length > 0) {
          this.selectedCountryCode = this.countryCodes[0].dial_code;
        }
      }
    });
  }
  

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
    // Combine the selected country code with the phone number
    const fullPhoneNumber = `${this.selectedCountryCode}${this.phone}`;
    console.log('Full phone number:', fullPhoneNumber);

    var result = this.apiService.register({
      'name': this.username,
      'email': this.email,
      'phone': fullPhoneNumber,
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
        this.onSubmit = false;
        this.isRegError = true;
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.isRegError = false;
        }, 3400);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.regSub) {
      this.regSub.unsubscribe();
    }
  }

}
