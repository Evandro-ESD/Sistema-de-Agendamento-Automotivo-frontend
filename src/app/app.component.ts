// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { RegisterComponent } from './pages/register/register.component';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, RegisterComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title = 'front_agendamento_oficina';
// }
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}

src / main.ts(bootstrapping);

typescript;

bootstrapApplication(AppComponent, appConfig);
