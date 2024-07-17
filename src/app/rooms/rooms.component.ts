import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AllRoomsDetails } from '../interface/allrooms-detail';
import { Subscription } from 'rxjs';
import { RoomFilterParams } from '../interface/filter-params';

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
  allRooms: AllRoomsDetails = {};

  // Filtering, Sorting the users
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  // Get all rooms
  getAllRooms(params: RoomFilterParams) {
    var result = this.apiService.getAllRooms(params);
    this.allRoomSubs = result.subscribe({
      next: (response: AllRoomsDetails) => {
        this.allRooms = response;
      },
      error: (err) => {
        console.log('Error getting all rooms', err.message);
      },
    });
  }
}
