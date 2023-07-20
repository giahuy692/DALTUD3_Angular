import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBlockComponent } from './grid-block.component';

describe('GridBlockComponent', () => {
  let component: GridBlockComponent;
  let fixture: ComponentFixture<GridBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridBlockComponent]
    });
    fixture = TestBed.createComponent(GridBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
