import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAssociateComponent } from './login-associate.component';

describe('LoginAssociateComponent', () => {
  let component: LoginAssociateComponent;
  let fixture: ComponentFixture<LoginAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAssociateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
