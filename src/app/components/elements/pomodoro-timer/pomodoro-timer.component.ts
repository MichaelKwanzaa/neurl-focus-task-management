import { Component, Input, OnInit } from '@angular/core';
import { Settings, Task } from 'src/app/models';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.scss']
})
export class PomodoroTimerComponent implements OnInit {
  @Input() task!: Task;
  @Input() settings!: Settings;
  @Input() savedState: any | undefined;

  pomodoroTime = this.settings.pomodoroWorkTime * 60;
  shortBreakTime = this.settings.pomodoroShortBreakTime * 60;
  longBreakTime = this.settings.pomodoroLongBreakTime * 60;
  interval = this.settings.pomodoroIntervalCount;

  timeRemaining: number = 1500;
  intervalId: any;

  isTimerRunning: boolean = false;
  cycles = 0;
  phase: 'pomodoro' | 'short' | 'long' = 'pomodoro';

  ngOnInit() {
    // Load saved state from local storage or service
    if (this.savedState) {
      this.phase = this.savedState.phase;
      this.timeRemaining = this.savedState.timeRemaining;
    }
  }

  start() {
    if (this.phase === 'pomodoro') {
      this.startPomodoro();
    } else if (this.phase === 'short') {
      this.startShortBreak(this.timeRemaining); // Resume with remaining break time
    } else if (this.phase === 'long') {
      this.startLongBreak(this.timeRemaining); // Resume with remaining break time
    } else {
      this.startPomodoro(); // Start fresh pomodoro if no saved state
    }
  }

  startPomodoro() {
    this.timeRemaining = this.pomodoroTime;
    this.phase = 'pomodoro';
    this.intervalId = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.onTimerEnd();
      }
    }, 1000);
  }

  onTimerEnd() {
    clearInterval(this.intervalId);
    this.cycles++;

    if (this.phase === 'pomodoro') {
      if (this.cycles % this.interval === 0) {
        this.startLongBreak();
      } else {
        this.startShortBreak();
      }
    } else {
      this.startPomodoro();
    }
  }

  startShortBreak(remainingTime = this.shortBreakTime) {
    this.phase = 'short';
    this.timeRemaining = remainingTime;
    this.intervalId = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.onTimerEnd();
      }
    }, 1000);
  }

  startLongBreak(remainingTime = this.longBreakTime) {
    this.phase = 'long';
    this.timeRemaining = remainingTime;
    this.intervalId = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.onTimerEnd();
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
    this.isTimerRunning = false;
    // Save current state (phase, timeRemaining) to local storage or service
    this.saveState();
  }

  reset() {
    clearInterval(this.intervalId);
    this.isTimerRunning = false;
    this.cycles = 0;
    this.phase = 'pomodoro';
    this.timeRemaining = this.pomodoroTime;
    // Clear saved state
    this.clearState();
  }

  saveState() {
    const state = {
      phase: this.phase,
      timeRemaining: this.timeRemaining
    };
    // Implement logic to save state in local storage or service (replace with your storage logic)
    localStorage.setItem('pomodoroState', JSON.stringify(state));
  }

  clearState() {
    // Implement logic to clear state from local storage or service (replace with your storage logic)
    localStorage.removeItem('pomodoroState');
  }
}    
