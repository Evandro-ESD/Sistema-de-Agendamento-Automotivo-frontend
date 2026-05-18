import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { oficinasMock } from '../../../../mocks/database';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  servicesOpen = false;
  lacalizacaoOpen = false;

  constructor() {}

  private route = inject(ActivatedRoute);

  oficinas = oficinasMock;

  ngOnInit(): void {
    console.log('Oficinas: \n', this.oficinas);

    const oficina = this.route.snapshot.queryParamMap.get('o.nome');

    console.log('Of: \n', oficina);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.servicesOpen = false;
  }
}
