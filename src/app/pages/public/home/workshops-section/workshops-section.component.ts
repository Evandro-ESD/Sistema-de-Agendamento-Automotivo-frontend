import { Component } from '@angular/core';
import { WORKSHOPS_MOCK } from '../../../../mocks/workshops.mock';
import { WorkshopCardComponent } from '../../../../shared/components/workshop-card/workshop-card.component';

@Component({
  selector: 'app-workshops-section',
  imports: [WorkshopCardComponent],
  templateUrl: './workshops-section.component.html',
  styleUrl: './workshops-section.component.css',
})
export class WorkshopsSectionComponent {
  workshops = WORKSHOPS_MOCK;
}
