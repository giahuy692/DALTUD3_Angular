import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordProtectComponent } from './password-protect.component';

describe('PasswordProtectComponent', () => {
  let component: PasswordProtectComponent;
  let fixture: ComponentFixture<PasswordProtectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordProtectComponent]
    });
    fixture = TestBed.createComponent(PasswordProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
