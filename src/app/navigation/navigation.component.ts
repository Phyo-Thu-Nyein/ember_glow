import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  // Subscriptions
  userDetailSub: Subscription = new Subscription();
  routerEventSub: Subscription = new Subscription();

  // Variables
  userImgUrl: string | null = '';
  userImgExist: boolean = false;

  constructor(
    private router: Router
  ) { }

  // OnInit & OnDestroy
  ngOnInit() {
    this.updateUserDetails();
    this.routerEventSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserDetails();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  // LOGICS
  // get the user's img 
  getUserImg() {
    this.userImgUrl = localStorage.getItem('pfp');
    if (this.userImgUrl == null) {
      this.userImgExist = false;
    } else {
      this.userImgExist = true;
    }
  }

  // Update user details
  updateUserDetails() {
    this.getUserImg();
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
    this.router.navigateByUrl('login');
  }

}
