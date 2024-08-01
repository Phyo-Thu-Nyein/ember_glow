import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfettiService } from 'src/app/services/confetti.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit, OnDestroy {
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;
  selectedImageIndex: number | null = null;

  // Subscriptions
  createRoomSub: Subscription = new Subscription();

  // Variables
  createRoomForm: FormGroup;
  isLoading: boolean = false; // loading
  isSaving: boolean = false;
  errorMessage: string | null = null;
  roomStatus: string[] = ['Available', 'Maintenance', 'Unavailable'];
  roomTypes: string[] = ['Suite', 'Superior', 'Deluxe', 'Standard'];
  createSuccess: boolean = false;

  // Image upload part
  tempFiles: (string | ArrayBuffer | null)[] = [null, null, null, null, null];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private confettiService: ConfettiService, // Confetti for successful room creation
    private loadingService: LoadingService
  ) {
    this.createRoomForm = this.fb.group({
      room_number: ['', Validators.required],
      room_type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      status: ['', Validators.required],
      images: [null, Validators.required],
    });
  }

  // OnInit & OnDestroy
  ngOnInit(): void {
    this.createSuccess = false;
    this.createRoomForm.patchValue({
      status: this.roomStatus[0], // Set the default value to the first option
      room_type: this.roomTypes[0],
    });
  }

  ngOnDestroy(): void {
    if (this.createRoomSub) {
      this.createRoomSub.unsubscribe();
    }
  }

  // LOGICS
  // Create a new room
  createNewRoom() {
    console.log('Button is clicked');
    if (this.createRoomForm.invalid) {
      console.log('FOrm invalid');
      return;
    }

    const formData = new FormData();
    formData.append(
      'room_number',
      this.createRoomForm.get('room_number')?.value
    );
    formData.append('room_type', this.createRoomForm.get('room_type')?.value);
    formData.append('price', this.createRoomForm.get('price')?.value);
    formData.append(
      'description',
      this.createRoomForm.get('description')?.value
    );
    formData.append('status', this.createRoomForm.get('status')?.value);

    // Append files for images
    const files = this.createRoomForm.get('images')?.value;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
    }

    this.isSaving = true;
    this.createRoomSub = this.apiService.createRoom(formData).subscribe({
      next: (response: any) => {
        console.log('Room created successfully');
        this.isSaving = false;
        this.createSuccess = true; // Room Creation Successful
        this.confettiService.launchConfetti(); // Hoorayy!
        // navigate to all-rooms page after 1 second
        setTimeout(() => {
          this.loadingService.showLoading();
          setTimeout(() => {
            this.router.navigateByUrl('all-rooms');
          }, 460);
        }, 2000);
      },
      error: (error) => {
        console.log('Error creating the room', error.message);
        this.isSaving = false;
        this.errorMessage = error.message;
      },
    });
  }

  // Handle file input change
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tempFiles[index] = reader.result;
        const filesArray = this.createRoomForm.get('images')?.value || [];
        filesArray[index] = file;
        this.createRoomForm.patchValue({
          images: filesArray,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Trigger file input click
  onFileClick(index: number) {
    const fileInput = this.fileInputs.toArray()[index].nativeElement;
    fileInput.click();
  }
}
