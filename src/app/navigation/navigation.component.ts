import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PfpSharedService } from '../services/pfp-shared.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  // Subscriptions
  userDetailSub: Subscription = new Subscription();
  routerEventSub: Subscription = new Subscription();
  profilePicUpdatedSub: Subscription = new Subscription();

  // Variables
  userImgUrl: string | null = '';
  userImgExist: boolean = false;
  userRole: string | null = '';

  constructor(
    private router: Router,
    private sharedService: PfpSharedService,
    private loadingService: LoadingService
  ) {}

  // OnInit & OnDestroy
  ngOnInit() {
    this.updateUserDetails();
    this.routerEventSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateUserDetails();
      }
    });
    this.profilePicUpdatedSub = this.sharedService.profilePicUpdated$.subscribe(
      () => {
        this.updateUserDetails();
      }
    );
  }
  ngOnDestroy(): void {
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  // LOGICS
  // get the user's img
  getUserDetails() {
    this.userImgUrl = localStorage.getItem('pfp') === 'null' ? null : localStorage.getItem('pfp'); // get the user profile pic
    this.userRole = localStorage.getItem('role'); // get the user role
    if (this.userImgUrl == null) {
      this.userImgExist = false;
    } else {
      this.userImgExist = true;
    }
  }

  // Update user details
  updateUserDetails() {
    this.getUserDetails();
    this.isLoggedIn();
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('pfp');
    this.userImgUrl = null;
    this.userImgExist = false;
    this.loadingService.showLoading(); // show loading b4 navigate
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 460);
  }
}
