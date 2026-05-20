import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownMenuItem } from '../models/dropdown-menu-item.interface';
import { oficinasMock } from './../../../../mocks/database';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  oficinasMock = oficinasMock;

  menuDropdown: DropdownMenuItem[] = this.oficinasMock.map((oficina) => ({
    label: oficina.nome,
    // route: `/oficina/${oficina.id}`,
    route: '/oficina1-fake',
    icon: '🔧',
  }));
}
