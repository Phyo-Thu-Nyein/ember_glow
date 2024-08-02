import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor (private router:Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.showLoading();
  }

  goToRooms() {
    this.loadingService.showLoading(); // loading b4 navigate
    setTimeout(() => {
      this.router.navigateByUrl('rooms');
    }, 460);
  }
}
