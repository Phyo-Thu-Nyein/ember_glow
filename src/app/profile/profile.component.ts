import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserDetails } from '../interface/user-details';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput?: ElementRef;

  // Subscriptions
  userProfileSub: Subscription = new Subscription();
  uploadSub: Subscription = new Subscription();
  updateUserInfoSub: Subscription = new Subscription();

  userData?: UserDetails = {};
  roleText: string = 'Guest';
  isEditMode: boolean = false;

  //Profile pic
  selectedFile?: File;
  profilePicture: string = 'assets/images/default-profile.svg'; //default profile
  isLoading: boolean = false;
  isLoadingUpload: boolean = false;
  isLoadingUpdateInfo: boolean = false;
  backendUrl: string = 'https://hotel-api-v2-ocur.onrender.com'; //backend server URL

  //Validate the ph no
  phoneNum: number | null = null;
  isPhoneValid: boolean = true;
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    console.log("fetching user data!!!!!!!!!!!!")
    this.isLoading = true;
    var result = this.apiService.getUserProfile();
    this.userProfileSub = result.subscribe({
      next: (response: UserDetails) => {
        this.userData = response;
        console.log("User data: ", this.userData);
        if (this.userData && this.userData.data) {
          this.setRoleText(this.userData.data?.role!);
          if (this.userData.data.profilePicture) {
            console.log("there is a pfp", this.userData.data.profilePicture);
            this.profilePicture = `${this.backendUrl}${this.userData.data.profilePicture}`;
            console.log(this.profilePicture);
          } 
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log("Error fetching user data: ", err.message);
        this.isLoading = false;
      }
    });
  }

  setRoleText(role: number) {
    switch (role) {
      case 1:
        this.roleText = 'Manager';
        break;
      case 2:
        this.roleText = 'Reception';
        break;
      case 3:
        this.roleText = 'Housekeeper';
        break;
      case 4:
        this.roleText = 'Server';
        break;
      default:
        this.roleText = 'Guest';
        break;
    }
  }

  //Upload/ change PROFILE PIC
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.isLoadingUpload = true;
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile);

    var result = this.apiService.uploadPfp(formData);
    this.uploadSub = result.subscribe({
      next: (response: UserDetails) => {
        console.log('Profile picture uploaded successfully', response);
        this.profilePicture = `${this.backendUrl}${response.data?.profilePicture}`;
        this.isLoadingUpload = false;
        this.resetFileInput();
      },
      error: (error) => {
        console.error('Error uploading profile picture', error);
        this.isLoadingUpload = false;
        this.resetFileInput();
      }
    })
  }

  resetFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  //Update user info
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveUserInfo() {
    if (this.userData && this.userData.data) {
      var result = this.apiService.updateUserInfo(this.userData!.data!);
      this.updateUserInfoSub = result.subscribe({
        next: (response) => {
          console.log('info updated', response);
          this.isEditMode = false;
        },
        error: (err) => {
          console.error('Error updating user info', err.message);
        }
      });
    }
  }

  //Validate the ph no
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

  // Unsubscribe after view
  ngOnDestroy(): void {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
    if (this.updateUserInfoSub) {
      this.updateUserInfoSub.unsubscribe();
    }
    console.log('unsubscribed!!!!!!!!1')
  }

}
