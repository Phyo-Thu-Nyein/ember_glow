import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllRoomsDatum, AllRoomsDetails } from 'src/app/interface/allrooms-detail';
import { RoomFilterParams } from 'src/app/interface/filter-params';
import { ApiService } from 'src/app/services/api.service';
import { NotFoundService } from 'src/app/services/not-found.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit, OnDestroy {
  // Subscriptions
  allRoomSubs: Subscription = new Subscription();

  // Variables
  allRooms: AllRoomsDatum[] = [];
  room2BeDeletedId: string = '';
  room2BeDeletedNumber: string = '';

  // For loading
  isFetching: boolean = false;

  // Filtering, Sorting the rooms
  params: RoomFilterParams = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    roomType: '',
    roomNumber: '',
    status: '',
    minPrice: null!,
    maxPrice: null!,
    checkIn: '',
    checkOut: '',
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = { ...this.params, ...params };
      this.getAllRooms(this.params);
    });
    this.checkNotFound();
  }

  //LOGICS
  // Check if the user has alrdy been redirected 
  checkNotFound() {
    if (this.notFoundService.getRedirectedToNotFound()) {
      this.notFoundService.setRedirectedToNotFound(false); // Reset the flag
      return; // Prevent further processing
    }
  }

  // Get all rooms with fitering sorting 
  getAllRooms(params: RoomFilterParams) {
    this.isFetching = true; // loading
    var result = this.apiService.getAllRooms(params);
    this.allRoomSubs = result.subscribe({
      next: (response: AllRoomsDetails) => {
        this.allRooms = response.data!;
        this.currentPage = response.currentPage!;
        this.totalPages = response.totalPages!;
        console.log('all rooms fetched');
        this.isFetching = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.notFoundService.setRedirectedToNotFound(true);
          this.router.navigate(['/not-found']);
        } else {
          console.log('Error getting all rooms', err.message);
        }
        this.isFetching = false;
      },
    });
  }

  // Pagination
  onPageChange(pageNumber: number) {
    this.params.page = pageNumber;
    this.filterRooms();
  }

  
  // Update page param to reset it to 1
  resetPage() {
    // Update page param to reset it to 1
    this.params.page = 1;
  }

  // Method to filter rooms based on the form inputs
  filterRooms() {
    // Update the URL with the new query parameters
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.params,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Fetch rooms with the updated parameters
        this.getAllRooms(this.params);
      });
  }

  // Go to one room deails page
  goToRoomDetails(roomId : string) {
    this.router.navigateByUrl(`update-room/${roomId}`);
    console.log(roomId);
  }

  // Unsubscribe on page leave
  ngOnDestroy(): void {
    if (this.allRoomSubs) {
      this.allRoomSubs.unsubscribe();
    }
  }
}
