import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Task } from 'src/app/models';
import { Category } from 'src/app/models/Category.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  currentStep = 0;

  @Input() taskData: Task = {
    title: '',
    description: '',
    priority: '',
    category: '',
    isCompleted: false,
    startDate: null,
    dueDate: null,
    estimatedTime: 0,
    notes: '',
    timer: '',
    subtasks: []
  };

  @Input() categories: Category[] = []; // Receives categories from parent component
  selectedCategory: string = '';
  newCategoryName: string = '';


  constructor(@Inject(NZ_MODAL_DATA) public data: any){
  }

  ngOnInit(){
    this.categories = this.data['categories'].map((cat: any) => {
      return {
        name: cat.name[0].toUpperCase() + cat.name.slice(1)
      }
      })
  }

  handleIndexChange(index: number): void {
    this.currentStep = index;
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }
  
  handleTimerSelection(timerType: string) {
    this.taskData.timer = timerType;
    if (timerType === 'task-based' || timerType === 'infinite') {
      // Show subtasks section
      // You can initialize subtasks here if needed
    } else {
      // Hide subtasks section
      this.taskData.subtasks = [];
    }
  }

  addSubtask() {
    this.taskData.subtasks.push({
      title: '',
      description: '',
      isCompleted: false,
      order: this.taskData.subtasks.length + 1,
      estimatedTime: 0,
      notes: ''
    });
  }

  removeSubtask(index: number) {
    this.taskData.subtasks.splice(index, 1);
    // Update order of remaining subtasks
    this.taskData.subtasks.forEach((subtask, idx) => subtask.order = idx + 1);
  }

  onCategoryChange(value: any): void {
    if(this.selectedCategory === 'new-option'){
      this.taskData.category = '';
    } else {
      this.taskData.category = this.selectedCategory;
    }
  }
}
