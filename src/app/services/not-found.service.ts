import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotFoundService {

  private redirectedToNotFound = false;
  constructor() { }

  setRedirectedToNotFound(value: boolean) {
    this.redirectedToNotFound = value;
  }

  getRedirectedToNotFound(): boolean {
    return this.redirectedToNotFound;
  }

}
