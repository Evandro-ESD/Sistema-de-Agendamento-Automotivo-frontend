import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { WORKSHOPS_MOCK } from '../../../../mocks/oficinas-card.mock';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  workshops = WORKSHOPS_MOCK;

  currentIndex = 0;

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
}
