import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hotel-frontend-angular';

  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        // End the loading animation after a slight delay to keep it visible for a minimum duration
        setTimeout(() => {
          this.loadingService.hideLoading();
        }, 1500); // Keep this delay to 1.5 seconds to ensure the animation plays completely
      }
    });
  }
}
