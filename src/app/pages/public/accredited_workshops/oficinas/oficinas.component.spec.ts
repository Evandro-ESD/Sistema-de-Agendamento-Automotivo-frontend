/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OficinasComponent } from './oficinas.component';

describe('OficinasComponent', () => {
  let component: OficinasComponent;
  let fixture: ComponentFixture<OficinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
