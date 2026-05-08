import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosAgendamentosComponent } from './relatorios-agendamentos.component';

describe('RelatoriosAgendamentosComponent', () => {
  let component: RelatoriosAgendamentosComponent;
  let fixture: ComponentFixture<RelatoriosAgendamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatoriosAgendamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
