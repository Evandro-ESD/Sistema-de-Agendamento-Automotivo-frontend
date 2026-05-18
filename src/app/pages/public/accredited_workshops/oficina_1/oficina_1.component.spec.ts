/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Oficina_1Component } from './oficina_1.component';

describe('Oficina_1Component', () => {
  let component: Oficina_1Component;
  let fixture: ComponentFixture<Oficina_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oficina_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oficina_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
