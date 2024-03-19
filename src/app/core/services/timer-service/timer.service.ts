import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerState = new BehaviorSubject<boolean>(false);
  timerActive: Observable<boolean> = this.timerState.asObservable();

  startTimer() {
    this.timerState.next(true);
    // Start your timer logic here
  }

  stopTimer() {
    this.timerState.next(false);
    // Stop your timer logic here
  }
}
