import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WORKSHOPS_MOCK } from '../../../mocks/workshops.mock';
import { WorkshopCardComponent } from '../workshop-card/workshop-card.component';

@Component({
  imports: [CommonModule, WorkshopCardComponent],
  selector: 'app-workshops-section',
  templateUrl: './workshops-section.component.html',
  styleUrls: ['./workshops-section.component.css'],
})
export class WorkshopsSectionComponent implements OnInit {
  workshops = WORKSHOPS_MOCK;

  constructor() {}

  ngOnInit() {}
}
