import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/componets/footer/footer.component';
import { HeaderComponent } from '../../shared/componets/header/header.component';
import { HeroComponent } from '../../shared/componets/hero/hero.component';
import { WelcomeCardComponent } from '../../shared/componets/welcome-card/welcome-card.component';

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
