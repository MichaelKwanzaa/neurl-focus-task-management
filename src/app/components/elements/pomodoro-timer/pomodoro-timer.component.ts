import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from 'src/app/core/services/timer-service/timer.service';
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


  progress = 0; // Initial progress
  
  pomodoroTime = this.settings?.pomodoroWorkTime ? this.settings.pomodoroWorkTime * 60 : 1500; // Default to 25 minutes
  shortBreakTime = this.settings?.pomodoroShortBreakTime ? this.settings.pomodoroShortBreakTime * 60 : 300; // Default to 5 minutes
  longBreakTime = this.settings?.pomodoroLongBreakTime ? this.settings.pomodoroLongBreakTime * 60 : 900; // Default to 15 minutes
  interval = this.settings?.pomodoroIntervalCount ? this.settings.pomodoroIntervalCount : 4; // Default to 4 pomodoros before a long break

  timeRemaining: number = this.pomodoroTime;
  intervalId: any;

  isTimerRunning: boolean = false;
  cycles = 0;
  pomodoroCount = 0;
  phase: 'pomodoro' | 'short' | 'long' = 'pomodoro';

  constructor(private timerService: TimerService){

  }

  ngOnInit() {
    // Load saved state from local storage or service
    if (this.savedState) {
      this.phase = this.savedState.phase;
      this.timeRemaining = this.savedState.timeRemaining;
      this.cycles = this.savedState.cycles;
      this.pomodoroCount = this.savedState.pomodoroCount || 0;
    } else {
      this.timeRemaining = this.pomodoroTime;
      this.pomodoroCount = 0;
    }
  
    console.log(this.settings);
  }

  startTimer() {
    this.isTimerRunning = true;
    this.setupInterval();
  }
  
  setupInterval() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.onTimerEnd();
      }
    }, 1000);
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
    this.phase = 'pomodoro';
    this.timeRemaining = this.pomodoroTime;
    this.timerService.startTimer();
  }
  
  startShortBreak(remainingTime = this.shortBreakTime) {
    this.phase = 'short';
    this.timeRemaining = remainingTime;
    this.timerService.stopTimer();
  }
  
  startLongBreak(remainingTime = this.longBreakTime) {
    this.phase = 'long';
    this.timeRemaining = remainingTime;
    this.timerService.stopTimer();
  }
  

  onTimerEnd() {
    clearInterval(this.intervalId);
    this.timerService.stopTimer();

    if (this.phase === 'pomodoro') {
      this.pomodoroCount++;
      if (this.pomodoroCount % this.interval === 0) {
        this.startLongBreak();
      } else {
        this.startShortBreak();
      }
    } else {
      this.startPomodoro();
    }
  }

  pause() {
    clearInterval(this.intervalId);
    this.isTimerRunning = false;
    this.saveState();
    this.timerService.stopTimer();
  }

  skip() {
    clearInterval(this.intervalId);
    if (!this.isTimerRunning) {
      if (this.phase === 'pomodoro') {
        this.pomodoroCount++;
        if (this.pomodoroCount % this.interval === 0) {
          this.startLongBreak();
        } else {
          this.startShortBreak();
        }
      } else if (this.phase === 'short') {
        this.startPomodoro();
      } else if (this.phase === 'long') {
        this.startPomodoro();
        this.pomodoroCount = 0; // Reset the Pomodoro count after a long break
      }
    } else {
      // If the timer is running, don't do anything
      return;
    }
  }

  reset() {
    clearInterval(this.intervalId);
    this.timerService.stopTimer();
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
      timeRemaining: this.timeRemaining,
      cycles: this.cycles,
      pomodoroCount: this.pomodoroCount
    };
    localStorage.setItem('pomodoroState', JSON.stringify(state));
  }

  calculateProgress(): number {
    const totalTime = this.phase === 'pomodoro' ? this.pomodoroTime : (this.phase === 'short' ? this.shortBreakTime : this.longBreakTime);
    const progress = 100 - (this.timeRemaining / totalTime) * 100;
    return Math.min(Math.max(progress, 0), 100); // Clamp progress between 0 and 100
  }

  clearState() {
    // Implement logic to clear state from local storage or service (replace with your storage logic)
    localStorage.removeItem('pomodoroState');
  }
}    
