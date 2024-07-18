import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AllUserDatum, AllUsersDetails } from '../interface/allusers-detail';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFilterParams } from '../interface/filter-params';
import { NotFoundService } from '../services/not-found.service';

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

  // For loading
  isFetching: boolean = false;

  // Filtering, Sorting the users
  params: UserFilterParams = {
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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute, 
    private notFoundService: NotFoundService
  ) {}

  // On Init
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = { ...this.params, ...params };
      this.getAllUsers(this.params);
    });
    this.checkNotFound();
  }

  // LOGICS
  // Check if the user has alrdy been redirected 
  checkNotFound() {
    if (this.notFoundService.getRedirectedToNotFound()) {
      this.notFoundService.setRedirectedToNotFound(false); // Reset the flag
      return; // Prevent further processing
    }
  }

  //Get all users, Filtering, Pagination
  getAllUsers(params: UserFilterParams) {
    this.isFetching = true;
    var result = this.apiService.getAllUsers(params);
    this.allUsersSub = result.subscribe({
      next: (response: AllUsersDetails) => {
        this.allUsers = response.data!;
        this.currentPage = response.currentPage!;
        this.totalPages = response.totalPages!;
        console.log('all users fetched');
        this.isFetching = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.notFoundService.setRedirectedToNotFound(true);
          this.router.navigate(['/not-found']);
        } else {
          console.error('Error getting all users', err.message);
        }
        this.isFetching = false;
      },
    });
  }

  // Pagination
  onPageChange(pageNumber: number) {
    this.params.page = pageNumber;
    this.filterUsers();
  }

  
  // Update page param to reset it to 1
  resetPage() {
    // Update page param to reset it to 1
    this.params.page = 1;
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

  // Store the id and name for later use
  showUserId(userId: string, userName: string) {
    this.user2BeDeletedId = userId; // Stored for later use
    this.user2BeDeletedName = userName;
    console.log(this.user2BeDeletedId, this.user2BeDeletedName); //Show user id on click (for debugging)
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
