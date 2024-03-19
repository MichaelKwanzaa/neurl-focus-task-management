import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticationCallbackComponent } from './google-authentication-callback.component';

describe('GoogleAuthenticationCallbackComponent', () => {
  let component: GoogleAuthenticationCallbackComponent;
  let fixture: ComponentFixture<GoogleAuthenticationCallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleAuthenticationCallbackComponent]
    });
    fixture = TestBed.createComponent(GoogleAuthenticationCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
