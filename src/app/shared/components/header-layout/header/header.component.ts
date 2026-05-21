import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { oficinasMock } from '../../../../mocks';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownMenuItem } from '../models/dropdown-menu-item.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuOpen = signal(false);
  oficinasMock = oficinasMock;

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  menuDropdown: DropdownMenuItem[] = this.oficinasMock.map((oficina) => ({
    label: oficina.nome,
    route: `/agendamento-online/${oficina.id}`,
    // route: '/oficina1-fake',
    icon: '🔧',
  }));

  menuDropdownContact: DropdownMenuItem[] = this.oficinasMock.map(
    (oficina) => ({
      label: oficina.nome,
      route: `/agendamento-online/localizacao/${oficina.id}`,
      // route: '/onde-estamos',
      icon: '🔧',
    }),
  );
}
