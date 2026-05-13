import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { WORKSHOPS_MOCK } from '../../../../mocks/workshops.mock';

@Component({
  selector: 'app-services-section',
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent {
  workshops = WORKSHOPS_MOCK;

  currentIndex = 0;

  isPaused = false;

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide(): void {
    if (this.currentIndex < this.workshops.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.workshops.length - 1;
    }
  }
  pauseCarousel(): void {
    this.isPaused = true;
  }

  resumeCarousel(): void {
    this.isPaused = false;
  }
}
