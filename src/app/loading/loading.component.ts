import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })), // Initial state when component is not rendered
      state('*', style({ opacity: 1 })), // Final state
      transition(':enter', [ // On entering the view
        animate('0.5s ease-in')
      ]),
      transition(':leave', [ // On leaving the view
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class LoadingComponent {
  constructor (public loadingService: LoadingService) {}
}
