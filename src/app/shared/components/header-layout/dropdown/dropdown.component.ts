import { ChangeDetectionStrategy, Component, signal, computed, input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { MenuItem } from '../models/menu-item.interface';

@Component({
  selector: 'app-dropdown',
  imports: [RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {


  item = input.required<MenuItem>()

  open = signal(false)

  hasChildren =  computed(() => {
    return !!this.item().children?.length
  })
  constructor(private readonly router: Router){
    this.router.events.subscribe(() => {
      this.close()
    })
  }

  openMenu(): void{
    this.open.set(true)
  }
  close(): void{
    this.open.set(false)
  }
  toggle(): void{
    this.open.update((value) => !value)
  }
  trackByLabel(_: number, item: MenuItem): string{
    return item.label
  }
}
