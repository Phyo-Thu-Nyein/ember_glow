import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PfpSharedService {

  private profilePicUpdatedSource = new Subject<void>();
  profilePicUpdated$ = this.profilePicUpdatedSource.asObservable();
  constructor() { }

  notifyProfilePicUpdated() {
    this.profilePicUpdatedSource.next();
  }
}
