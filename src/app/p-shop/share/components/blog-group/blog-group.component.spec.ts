import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGroupComponent } from './blog-group.component';

describe('BlogGroupComponent', () => {
  let component: BlogGroupComponent;
  let fixture: ComponentFixture<BlogGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogGroupComponent]
    });
    fixture = TestBed.createComponent(BlogGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
