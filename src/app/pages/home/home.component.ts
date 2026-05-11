import { Component, OnInit } from '@angular/core';
import { seedDatabase } from '../../core/database.seed';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
// import { HeroComponent } from '../../shared/components/hero/hero.component';
import { WelcomeCardComponent } from '../../shared/components/welcome-card/welcome-card.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    // HeroComponent,
    WelcomeCardComponent,
    FooterComponent,
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
