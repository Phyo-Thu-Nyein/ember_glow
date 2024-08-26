import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Carousel } from 'src/app/interface/carousel-detail';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
})
export class FacilitiesComponent {
  @ViewChild('next') nextDom!: ElementRef;
  @ViewChild('prev') prevDom!: ElementRef;
  @ViewChild('carousel') carouselDom!: ElementRef;
  @ViewChild('listItem') listItemDom!: ElementRef;
  @ViewChild('thumbnail') thumbnailDom!: ElementRef;

  timeRunning = 1000;
  runTimeOut: any;

  carouselItems: any[] = [];
  thumbnails: any[] = [];

  constructor(private carouselService: ApiService) {}

  ngOnInit(): void {
    this.carouselService.getCarouselData().subscribe((data) => {
      this.carouselItems = data;
      this.setupThumbnails();
    });
  }

  ngAfterViewInit(): void {
    this.nextDom.nativeElement.onclick = () => {
      this.showSlider('next');
    };
    this.prevDom.nativeElement.onclick = () => {
      this.showSlider('prev');
    };
  }

  setupThumbnails(): void {
    // Create a copy of carouselItems and move the first item to the end for thumbnails
    this.thumbnails = [...this.carouselItems.slice(1), this.carouselItems[0]];
  }

  showSlider(type: string): void {
    const itemSlider = this.carouselDom.nativeElement.querySelectorAll(
      '.facil .facil__list .facil__list-item'
    );
    const itemThumbnail = this.carouselDom.nativeElement.querySelectorAll(
      '.facil .thumbnail .thumb__item'
    );

    if (type === 'next') {
      this.listItemDom.nativeElement.appendChild(itemSlider[0]);
      this.thumbnailDom.nativeElement.appendChild(itemThumbnail[0]);
      this.carouselDom.nativeElement.classList.add('next');
    } else {
      const positionLastItem = itemSlider.length - 1;
      this.listItemDom.nativeElement.prepend(itemSlider[positionLastItem]);
      this.thumbnailDom.nativeElement.prepend(itemThumbnail[positionLastItem]);
      this.carouselDom.nativeElement.classList.add('prev');
    }

    clearTimeout(this.runTimeOut);
    this.runTimeOut = setTimeout(() => {
      this.carouselDom.nativeElement.classList.remove('next');
      this.carouselDom.nativeElement.classList.remove('prev');
    }, this.timeRunning);
  }
}
