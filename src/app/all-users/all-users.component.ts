import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AllUserDatum, AllUsersDetails } from '../interface/allusers-detail';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterParams } from '../interface/filter-params';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit, OnDestroy {
  // Subscriptions
  allUsersSub: Subscription = new Subscription();

  // Variables
  allUsers: AllUserDatum[] = [];
  user2BeDeletedId: string = '';
  user2BeDeletedName: string = '';

  // Filtering, Sorting the users
  params: FilterParams = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    filterByRole: '',
    name: '',
  };

  // Pagination
  currentPage: number = 1;
  totalPages: number = 0;
  pageLimit: number = 3;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // On Init
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = { ...this.params, ...params };
      this.getAllUsers(this.params);
    });
  }

  // LOGICS
  //Get all users, Filtering, Pagination
  getAllUsers(params: FilterParams) {
    var result = this.apiService.getAllUsers(params);
    this.allUsersSub = result.subscribe({
      next: (response: AllUsersDetails) => {
        this.allUsers = response.data!;
        this.currentPage = response.currentPage!;
        this.totalPages = response.totalPages!;
        console.log('all users fetched');
      },
      error: (err) => {
        console.error('Error getting all users', err.message);
      },
    });
  }

  // Pagination
  onPageChange(pageNumber: number) {
    this.params.page = pageNumber;
    this.filterUsers();
  }

  // Method to filter users based on the form inputs
  filterUsers() {
    // Update the URL with the new query parameters
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.params,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Fetch users with the updated parameters
        this.getAllUsers(this.params);
      });
  }

  // Pagination

  //Show user id on click (for debugging)
  showUserId(userId: string, userName: string) {
    this.user2BeDeletedId = userId; // Stored for later use
    this.user2BeDeletedName = userName;
    console.log(this.user2BeDeletedId, this.user2BeDeletedName);
  }

  // Delete User By Id
  deleteUserById(userId: string) {
    console.log('This user is going to be deleted:', userId);
    this.apiService.deleteUserById(userId).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.getAllUsers(this.params);
      },
      error: (err) => {
        console.log('Error deleting the user', err.message);
      },
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

  // On Destroy
  ngOnDestroy(): void {
    if (this.allUsersSub) {
      this.allUsersSub.unsubscribe();
    }
  }
}
