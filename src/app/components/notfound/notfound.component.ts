import { Component, OnDestroy } from '@angular/core';
import { NotFoundService } from 'src/app/services/not-found.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnDestroy {
  constructor(
    private notFoundService: NotFoundService, 
    private location: Location
  ) { }
  
  ngOnDestroy(): void {
    this.resetNotFoundFlag();
  }

  // Reset the flag & go back to previous page(location)
  resetNotFoundFlag() {
    this.notFoundService.setRedirectedToNotFound(false);// Reset the flag when leaving the not found page
    this.location.back(); // redirect to previous page
  }
}
