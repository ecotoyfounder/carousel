import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideService } from '@services/slide.service';
import { Slide } from '@interfaces/slide';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForOf, NgIf } from '@angular/common';
import { SlideComponent } from '@components/slide/slide.component';
import { carouselAnimations } from '@components/carousel.animations';
import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SlideComponent, NgIf, NgForOf, HammerModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [carouselAnimations],
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  currentIndex = 0;
  startX = 0;
  private unsubscribe$: Subject<void> = new Subject<void>();
  slideWidth = window.innerWidth;
  startTranslateValue = 0;

  translateValue = '0%';
  slideState = 0;

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.slideService
      .getSlides()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (slides) => {
          this.slides = slides;
        },
        error: (error) => {
          console.error('Error fetching slides:', error);
        },
      });

    interval(10000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.nextSlide();
      });
  }

  touchStart(event: TouchEvent) {
    this.startX = event.changedTouches[0].clientX;
    this.startTranslateValue = this.currentIndex * this.slideWidth;
  }

  touchMove(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - this.startX;
    this.translateValue = `${this.startTranslateValue + deltaX}px`;
  }

  touchEnd(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - this.startX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.slideState--;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.slideState++;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
