import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WorkshopCard } from '../../../models/workshop-card';

@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.css'],
  imports: [CommonModule],
})
export class WorkshopCardComponent implements OnInit {
  @Input({ required: true }) workshop!: WorkshopCard;

  constructor() {}

  ngOnInit() {}
}
