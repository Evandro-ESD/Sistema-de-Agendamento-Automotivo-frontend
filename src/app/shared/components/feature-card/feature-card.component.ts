import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css'],
})
export class FeatureCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input({ required: true }) title!: string;

  @Input({ required: true }) description!: string;
}
