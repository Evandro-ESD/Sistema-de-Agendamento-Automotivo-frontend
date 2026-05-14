import { Component, } from '@angular/core';
import { LoginComponent } from '../login.component';


@Component({
  imports: [],
  selector: "app-workshopp-login",
  templateUrl: "./login-workshop.component.html",
  // styleUrls: ["./login-workshop.component.css"],
})

export class LoginWorkshopComponent extends LoginComponent {
  expectedRole = 'admin_oficina';
  redirectPath = '/oficina/agendamentos';
  loginTitle = 'Área da Oficina';
  welcomeMessage = 'Acesse o painel da oficina';
  subtitle = 'Gerencie agendamentos, serviços e equipe.';
}

