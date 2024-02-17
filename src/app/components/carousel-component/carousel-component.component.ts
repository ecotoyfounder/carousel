import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { SlideService } from "@services/slide.service";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {SlideComponent} from "@components/slide/slide.component";
import {Slide} from "@interfaces/slide";

@Component({
  selector: 'app-carousel-component',
  standalone: true,
  imports: [
    SlideComponent,
    NgForOf
  ],
  templateUrl: './carousel-component.component.html',
  styleUrl: './carousel-component.component.css'
})
export class CarouselComponentComponent implements OnInit, OnDestroy {

  slides: Slide[] = [];
  startX = 0;
  currentIndex = 0;
  slideWidth = window.innerWidth;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private slideService: SlideService) { }

  ngOnInit() {
    this.slideService.getSlides()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (slides) => {
          this.slides = slides
        },
        error: (error) => {
          console.error('Error fetching slides:', error);
        }
      });

    interval(10000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.nextSlide();
      });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  swipe(event: TouchEvent) {
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
