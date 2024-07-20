import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AllRoomsDatum, AllRoomsDetails } from '../interface/allrooms-detail';
import { Subscription } from 'rxjs';
import { RoomFilterParams } from '../interface/filter-params';
import { NotFoundService } from '../services/not-found.service';

interface Location {
  value: string;
  viewValue: string;
}
interface roomType {
  value: string;
  viewValue: string;
}

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
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    roomType: '',
    status: '',
    minPrice: null!,
    maxPrice: null!,
    checkIn: '',
    checkOut: '',
  };

  // Pagination
  currentPage: number = 1;
  totalPages: number = 0;

  // ........... dummy codes ........
  fourTimes = [0, 1, 2, 3];

  selectedLocation?: string;
  selectedRoom?: string;

  locations: Location[] = [
    { value: 'mandalay', viewValue: 'Mandalay' },
    { value: 'yangon', viewValue: 'Yangon' },
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  roomTypes: roomType[] = [
    { value: 'Standard', viewValue: 'Standard' },
    { value: 'Deluxe', viewValue: 'Deluxe' },
    { value: 'Superior', viewValue: 'Superior' },
    { value: 'Suite', viewValue: 'Suite' },
  ];
  // ................ dummy codes...............

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
    this.router.navigateByUrl(`room-details/${roomId}`);
    console.log(roomId);
  }

  // Delete room by id for manager/ reception role logic here <<<<<<<<<<

  // Unsubscribe on page leave
  ngOnDestroy(): void {
    if (this.allRoomSubs) {
      this.allRoomSubs.unsubscribe();
    }
  }
}
