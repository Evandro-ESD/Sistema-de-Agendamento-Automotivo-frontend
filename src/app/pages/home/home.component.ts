import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { WelcomeCardComponent } from '../../shared/components/welcome-card/welcome-card.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    HeroComponent,
    WelcomeCardComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
