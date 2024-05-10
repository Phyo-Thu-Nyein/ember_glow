import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
export class RoomsComponent {
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
    { value: 'standard', viewValue: 'Standard' },
    { value: 'deluxe', viewValue: 'Deluxe' },
    { value: 'superior', viewValue: 'Superior' },
    { value: 'suite', viewValue: 'Suite' },
  ];
}
