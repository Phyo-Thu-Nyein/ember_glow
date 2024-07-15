import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AllUserDatum, AllUsersDetails } from '../interface/allusers-detail';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  // Subscriptions
  allUsersSub: Subscription = new Subscription();

  // Variables
  allUsers: AllUserDatum[] = [];
  user2BeDeletedId: string = '';
  user2BeDeletedName: string = '';

  constructor (private apiService: ApiService) { }

  // On Init
  ngOnInit(): void {
    this.getAllUsers();
  }

  // LOGICS
  //get all users
  getAllUsers() {
    var result = this.apiService.getAllUsers();
    this.allUsersSub = result.subscribe({
      next: (response: AllUsersDetails) => {
        this.allUsers = response.data!;
        console.log("all users fetched")
      }, 
      error: (err) => {
        console.error("Error getting all users", err.message);
      }
    })
  }

  //Show user id on click (for debugging)
  showUserId(userId: string, userName: string) {
    this.user2BeDeletedId = userId; // Stored for later use
    this.user2BeDeletedName = userName;
    console.log(this.user2BeDeletedId, this.user2BeDeletedName);
  }

  // Delete User By Id
  deleteUserById(userId: string) {
    console.log( 'This user is going to be deleted:',userId);
    this.apiService.deleteUserById(userId).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.getAllUsers();
      },
      error: (err) => {
        console.log('Error deleting the user', err.message);
      }
    });
  }

  // Get role text
  getRoleText(role: number): string {
    switch (role) {
      case 0:
        return 'Guest';
      case 1:
        return 'Manager';
      case 2:
        return 'Reception';
      case 3:
        return 'Housekeeper';
      case 4:
        return 'Server';
      default:
        return 'Guest';
    }
  }

  // for UI
  

  // On Destroy
  ngOnDestroy(): void {
    if (this.allUsersSub) {
      this.allUsersSub.unsubscribe();
    }
  }

}
