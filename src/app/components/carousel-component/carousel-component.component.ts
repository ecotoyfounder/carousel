import {Component, OnDestroy, OnInit} from '@angular/core';
import {SlideComponent} from "../slide/slide.component";
import {Slide} from "../../interfaces/slide";
import {NgForOf} from "@angular/common";
import {SlideService} from "../../services/slide.service";
import {Subscription} from "rxjs";

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
  interval = 0;
  slideWidth = window.innerWidth;
  slideSubscription = new Subscription();

  constructor(private slideService: SlideService) {
  }

  ngOnInit() {
    this.slideSubscription = this.slideService.getSlides()
      .subscribe({
        next: (slides) => {
          this.slides = slides
        },
        error: (error) => {
          console.error('Error fetching slides:', error);
        }
      });

    this.interval = setInterval(() => {
      this.nextSlide();
    }, 10000);
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
    this.slideSubscription.unsubscribe();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
