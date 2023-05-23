import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingleComponent } from './blog-single.component';

describe('BlogSingleComponent', () => {
  let component: BlogSingleComponent;
  let fixture: ComponentFixture<BlogSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogSingleComponent]
    });
    fixture = TestBed.createComponent(BlogSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
