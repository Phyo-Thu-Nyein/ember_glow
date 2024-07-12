import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyProfileDetail } from '../interface/profile-detail';
import { PfpUpload } from '../interface/pfp-detail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userData?: MyProfileDetail = {};
  roleText: string = 'Guest';

  //Profile pic
  selectedFile?: File;
  defaultPfp: string = '../../assests/images/default-profile.svg'; //default profile
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    console.log("fetching user data!!!!!!!!!!!!1")
    this.apiService.getUserProfile().subscribe({
      next: (response: MyProfileDetail) => {
        this.userData = response;
        this.setRoleText(this.userData?.data?.role!);
      },
      error: (err) => {
        console.log(err.message);
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
  loadProfilePic() {
    this.apiService.getUserProfile()
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile);

    this.apiService.uploadPfp(formData).subscribe({
      next: (response: PfpUpload) => {
        console.log('Profile picture uploaded successfully', response);
        this.defaultPfp = response.data?.profilePicture!;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error uploading profile picture', error);
        this.isLoading = false;
      }
    })
  }
}
