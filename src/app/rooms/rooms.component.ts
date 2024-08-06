import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AllRoomsDatum, AllRoomsDetails } from '../interface/allrooms-detail';
import { Subscription } from 'rxjs';
import { RoomFilterParams } from '../interface/filter-params';
import { NotFoundService } from '../services/not-found.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, OnDestroy {
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
    limit: 12,
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
    private notFoundService: NotFoundService,
    private loadingService: LoadingService
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
  goToRoomDetails(roomId: string) {
    this.loadingService.showLoading(); // show loading b4 navigate
    setTimeout(() => {
      this.router.navigateByUrl(`room-details/${roomId}`);
    }, 460);
    console.log(roomId);
  }

  // Unsubscribe on page leave
  ngOnDestroy(): void {
    if (this.allRoomSubs) {
      this.allRoomSubs.unsubscribe();
    }
  }
}
