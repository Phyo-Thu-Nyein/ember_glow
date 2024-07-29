import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  // Subscriptions
  userDetailSub: Subscription = new Subscription();

  // Variables
  userImgUrl: string | null = '';
  userImgExist: boolean = false;

  constructor(
    private router: Router
  ) { }

  // OnInit & OnDestroy
  ngOnInit() {
    this.isLoggedIn();
    this.getUserImg();
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
