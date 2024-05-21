import { Component, ElementRef, ViewChild } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.nextDom.nativeElement.onclick = () => {
      this.showSlider('next');
    };
    this.prevDom.nativeElement.onclick = () => {
      this.showSlider('prev');
    };
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
