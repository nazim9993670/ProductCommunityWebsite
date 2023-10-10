import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskReviewComponent } from './ask-review.component';

describe('AskReviewComponent', () => {
  let component: AskReviewComponent;
  let fixture: ComponentFixture<AskReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
