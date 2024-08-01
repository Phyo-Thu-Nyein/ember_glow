import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Directive({
  selector: '[appLoadingNavigate]'
})
export class LoadingDirective {
  @Input('appLoadingNavigate') targetUrl!: string; // The target URL to navigate to

  constructor(private router: Router, private loadingService: LoadingService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault(); // Prevent default navigation

    // Check if the current route is the same as the target route
    const currentUrl = this.router.url;

    if (currentUrl === this.targetUrl) {
      console.log('Already on the target route:', this.targetUrl);
      return; // Do nothing if already on the target route
    }

    // Show loading animation
    this.loadingService.showLoading();

    // Delay the navigation to allow loading animation to start
    setTimeout(() => {
      this.router.navigateByUrl(this.targetUrl);
    }, 460); // Adjust this delay as needed
  }

}
