import { Component, Input } from '@angular/core';
import { SubTask, Task } from 'src/app/models';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.scss']
})
export class DisplayTaskComponent {
  @Input() task: Task | null = null;
  showSubtasks = false;
  currentSubtask: SubTask | undefined;

  ngOnInit(){
    const incompleteSubtasks = this.task?.subtasks.filter(st => !st.isCompleted) || [];
    this.currentSubtask = incompleteSubtasks.length > 0 ? incompleteSubtasks[0] : undefined;
  }

  toggleSubtasks() {
    this.showSubtasks = !this.showSubtasks;
  }

  markSubtaskComplete(subtask: SubTask) {
    subtask.isCompleted = !subtask.isCompleted;
    // Implement logic to update task data (e.g., call a service)
  }

  markCompleted() {
    if (this.task) {
      this.task.isCompleted = true;
      this.task.subtasks.forEach(task => {
        task.isCompleted = true;
      })
    }
  }


  markCurrentAndMoveToNext(subtask: SubTask) {
    subtask.isCompleted = true;
    const incompleteSubtasks = this.task?.subtasks.filter(st => !st.isCompleted) || [];
    const currentIndex = incompleteSubtasks.findIndex(st => st === subtask);
    if (currentIndex !== -1 && currentIndex < incompleteSubtasks.length - 1) {
      this.currentSubtask = incompleteSubtasks[currentIndex + 1];
    } else {
      this.currentSubtask = undefined;
    }
  }

}
