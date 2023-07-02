import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCartComponent } from './manager-cart.component';

describe('ManagerCartComponent', () => {
  let component: ManagerCartComponent;
  let fixture: ComponentFixture<ManagerCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerCartComponent]
    });
    fixture = TestBed.createComponent(ManagerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
