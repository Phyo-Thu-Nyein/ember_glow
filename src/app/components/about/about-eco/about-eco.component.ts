import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about-eco',
  templateUrl: './about-eco.component.html',
  styleUrls: ['./about-eco.component.css'],
})
export class AboutEcoComponent {
  @ViewChild('paragraph') paragraph!: ElementRef;

  hoveredIndex: number | null = null;
  hoverIn: boolean = true;

  ecoItems: any[] = [];

  constructor(private ecoDataService: ApiService) {}

  ngOnInit(): void {
    this.ecoDataService.getEcoData().subscribe((data) => {
      this.ecoItems = data;
    });
  }

  rotateIn(index: number): void {
    this.hoveredIndex = index;
    this.hoverIn = true;
  }
  rotateOut(index: number): void {
    this.hoverIn = false;
    setTimeout(() => {
      if (!this.hoverIn) {
        this.hoveredIndex = null;
      }
    }, 400);
  }

  opacityIn(): void {
    this.paragraph.nativeElement.style.opacity = '0';
  }
  opacityOut(): void {
    this.paragraph.nativeElement.style.opacity = '1';
  }
}
