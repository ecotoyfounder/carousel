import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideService } from '@services/slide.service';
import { Slide } from '@interfaces/slide';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForOf, NgIf } from '@angular/common';
import { SlideComponent } from '@components/slide/slide.component';
import { carouselAnimations } from '@components/carousel.animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SlideComponent, NgIf, NgForOf],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [carouselAnimations],
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  currentIndex = 0;
  startX = 0;
  startY = 0;
  private unsubscribe$: Subject<void> = new Subject<void>();
  animationState: 'next' | 'prev' = 'prev';
  slideWidth = window.innerWidth;

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

  getFromTransform(): string {
    return `translateX(${this.currentIndex * -this.slideWidth}px)`;
  }

  getToTransform(): string {
    return `translateX(${(this.currentIndex - 1) * this.slideWidth}px)`;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.animationState = 'next';
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.animationState = 'prev';
  }

  touchStart(event: TouchEvent) {
    this.startX = event.changedTouches[0].clientX;
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
