import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsSectionComponent } from './workshops-section.component';

describe('WorkshopsSectionComponent', () => {
  let component: WorkshopsSectionComponent;
  let fixture: ComponentFixture<WorkshopsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
