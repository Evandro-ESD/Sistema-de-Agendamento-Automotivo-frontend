import { Component, OnInit } from '@angular/core';
import { seedDatabase } from '../../../core/database.seed';
// import { HeroComponent } from '../../shared/components/hero/hero.component';
import { BenefitsSectionComponent } from './benefits-section/benefits-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';

@Component({
  selector: 'app-home',
  imports: [
    // HeroComponent,
    HeroSectionComponent,
    BenefitsSectionComponent,
    ServicesSectionComponent,
    // WorkshopsSectionComponent,
    // CtaSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    seedDatabase();
  }

  zerarLocalStorage() {
    localStorage.clear();
  }
}
