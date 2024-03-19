import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from 'src/app/core/services/timer-service/timer.service';
import { Task, SubTask } from 'src/app/models';

@Component({
  selector: 'app-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent implements OnInit {
  @Input() task!: Task;

  currentSubtask?: SubTask;
  incompleteSubtasks: SubTask[] = [];
  timeRemaining: number = 0;
  intervalId: any;
  isTimerRunning: boolean = false;

  constructor(private timerService: TimerService){

  }
  
  ngOnInit() {
    this.initializeTimer();
  }

  initializeTimer() {
    this.incompleteSubtasks = this.task.subtasks.filter(subtask => !subtask.isCompleted);
    if (this.incompleteSubtasks.length > 0) {
      this.currentSubtask = this.incompleteSubtasks[0];
      this.timeRemaining = this.currentSubtask.estimatedTime * 60; // Convert minutes to seconds
    } else {
      // No incomplete subtasks, reset the timer
      this.currentSubtask = undefined;
      this.timeRemaining = 0;
    }
  }

  startTimer() {
    this.isTimerRunning = true;
    this.setupInterval();
    this.timerService.startTimer();
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

  onTimerEnd() {
    clearInterval(this.intervalId);
    this.timerService.stopTimer();

    if (this.currentSubtask) {
      // Mark the current subtask as completed
      this.currentSubtask.isCompleted = true;

      // Move to the next incomplete subtask, if any
      this.moveToNextSubtask();
    } else {
      // No current subtask, reset the timer
      this.timeRemaining = 0;
    }
  }

  moveToNextSubtask() {
    this.incompleteSubtasks = this.task.subtasks.filter(subtask => !subtask.isCompleted);

    if (this.incompleteSubtasks.length > 0) {
      const currentSubtaskIndex = this.incompleteSubtasks.findIndex(subtask => subtask === this.currentSubtask);

      if (currentSubtaskIndex !== -1 && currentSubtaskIndex < this.incompleteSubtasks.length - 1) {
        // Move to the next incomplete subtask
        this.currentSubtask = this.incompleteSubtasks[currentSubtaskIndex + 1];
        this.timeRemaining = this.currentSubtask.estimatedTime * 60;
      } else {
        // Move to the first incomplete subtask
        this.currentSubtask = this.incompleteSubtasks[0];
        this.timeRemaining = this.currentSubtask.estimatedTime * 60;
      }
    } else {
      // No more incomplete subtasks
      this.currentSubtask = undefined;
      this.timeRemaining = 0;
    }
  }

  pause() {
    clearInterval(this.intervalId);
    this.timerService.stopTimer();
    this.isTimerRunning = false;
  }

  reset() {
    clearInterval(this.intervalId);
    this.timerService.stopTimer();
    this.isTimerRunning = false;
    this.initializeTimer();
  }

  calculateProgress(): number {
    if (this.currentSubtask) {
      const totalTime = this.currentSubtask.estimatedTime * 60; // Convert minutes to seconds
      const progress = 100 - (this.timeRemaining / totalTime) * 100;
      return Math.min(Math.max(progress, 0), 100); // Clamp progress between 0 and 100
    }
    return 0; // No current subtask, return 0 progress
  }

  markCurrentAndMoveToNext() {
    if (this.currentSubtask) {
      // Mark the current subtask as completed
      this.currentSubtask.isCompleted = true;
  
      // Move to the next incomplete subtask, if any
      this.moveToNextSubtask();
    }
  }
}