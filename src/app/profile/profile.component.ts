import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyProfileDetail } from '../interface/profile-detail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userData?: MyProfileDetail = {};
  roleText: string = 'Guest';

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
}
