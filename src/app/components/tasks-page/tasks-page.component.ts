import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TaskService } from 'src/app/core/services/task-service/task.service';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-tasks-page`',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  tasks: Task[] | any = []; // Replace with your initial task data
  filteredTasks: Task[] = [];
  categories: string[] = []; // Replace with your category list
  priorities: string[] = ['Low', 'Medium', 'High']; // Replace with your priority list
  selectedCategory: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
  editingTask: Task | null = null;
  showModal: boolean = false;
  taskForm = this.fb.group({
    title: [''], // Add validators as needed
    description: [''],
    category: [''],
    priority: [''],
    dueDate: [''],
    estimatedTime: [''],
    notes: [''],
    isCompleted: ['']
  });

  searchTerm: string = '';

  constructor(private modalService: NzModalService,
    private fb: FormBuilder,
    private taskService: TaskService) {}

  ngOnInit() {
    // Initialize tasks and other data
    this.taskService.tasks$.subscribe((tasks) => {
      if(tasks){
        this.tasks = JSON.parse(tasks);
        this.filteredTasks = JSON.parse(tasks);
      }
    })
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter((task: any) =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editTask(task: Task) {
    this.editingTask = { ...task }; // Create a copy to avoid modifying original data
    this.showModal = true;
  }

  deleteTask(task: Task) {
    // Implement logic to delete task from data source (e.g., calling a service)
    const taskIndex = this.tasks.findIndex((t: any) => t.id === task.id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.filterTasks(); // Update filtered tasks
    }
  }

  cancelEdit() {
    this.editingTask = null;
    this.showModal = false;
  }

  getPriorityClass(priority: string) {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'low';
      case 'medium':
        return 'medium';
      case 'high':
        return 'high';
      default:
        return '';
    }
  }

  saveTask() {
    if (!this.editingTask?.title) {
      return; // Prevent saving without a title
    }

    if (this.editingTask.id) {
      // Update existing task
      const taskIndex = this.tasks.findIndex((t: any) => t.id === this.editingTask?.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = this.editingTask;
      }
    } else {
      // Create new task
      this.tasks.push(this.editingTask);
    }

    this.editingTask = null;
    this.showModal = false;
    this.filterTasks(); // Update filtered tasks
  }
}
