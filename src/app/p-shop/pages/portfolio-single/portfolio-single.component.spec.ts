import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSingleComponent } from './portfolio-single.component';

describe('PortfolioSingleComponent', () => {
  let component: PortfolioSingleComponent;
  let fixture: ComponentFixture<PortfolioSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioSingleComponent]
    });
    fixture = TestBed.createComponent(PortfolioSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
