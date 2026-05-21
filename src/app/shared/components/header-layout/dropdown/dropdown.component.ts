import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';

export interface DropdownMenuItem {
  label: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  private elementRef = inject(ElementRef);

  items = input.required<DropdownMenuItem[]>();

  title = input.required<string>();

  open = signal(false);

  mobile = signal(false);

  constructor() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  checkViewport(): void {
    this.mobile.set(window.innerWidth < 1024);
  }

  // ========================================
  // CLICK OUTSIDE
  // ========================================

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.open.set(false);
    }
  }

  toggleMenu(): void {
    this.open.update((value) => !value);
  }

  openDesktop(): void {
    if (!this.mobile()) {
      this.open.set(true);
    }
  }

  closeDesktop(): void {
    if (!this.mobile()) {
      this.open.set(false);
    }
  }

  closeMobile(): void {
    if (this.mobile()) {
      this.open.set(false);
    }
  }

  trackByLabel(_: number, item: DropdownMenuItem): string {
    return item.label;
  }
}
