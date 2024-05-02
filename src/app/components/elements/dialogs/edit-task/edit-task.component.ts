import { Component, Inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Category, Task } from 'src/app/models';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  currentStep = 0;

  taskData: Task | null = null;
  categories: Category[] = []; 
  
  constructor(@Inject(NZ_MODAL_DATA) public data: any){
    
  }

  ngOnInit(){
    this.categories = this.data['categories'].map((cat: any) => {
      return {
        name: cat.name[0].toUpperCase() + cat.name.slice(1)
      }
    })

    this.taskData = this.data['task'];
    if(this.taskData){
      this.taskData.id = this.data['task']['_id'];
    }
  }

  handleIndexChange(index: number): void {
    this.currentStep = index;
  }

}
