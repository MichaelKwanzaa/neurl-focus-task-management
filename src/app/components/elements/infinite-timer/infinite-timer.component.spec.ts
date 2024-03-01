import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteTimerComponent } from './infinite-timer.component';

describe('InfiniteTimerComponent', () => {
  let component: InfiniteTimerComponent;
  let fixture: ComponentFixture<InfiniteTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteTimerComponent]
    });
    fixture = TestBed.createComponent(InfiniteTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
