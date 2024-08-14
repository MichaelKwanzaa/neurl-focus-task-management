import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SettingService } from 'src/app/core/services/setting-service/setting.service';
import { Category, Settings, Task } from 'src/app/models';
import { CreateTaskComponent } from '../elements/dialogs/create-task/create-task.component';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { TaskService } from 'src/app/core/services/task-service/task.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';
import { NotificationLocalService } from 'src/app/core/services/notification-local-service/notification-local.service';
import { CategoryService } from 'src/app/core/services/category-service/category.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  timerType: string = 'pomodoro';
  settings: any = null;
  categories: Category[] = [];
  selectedTask: any = null;
  isAuthenticated: boolean = false;

  constructor(private settingsService: SettingService,
    private modalService: NzModalService,
    private authenticationService: AuthenticationService,
    private taskService: TaskService,
    private storageService: StorageService,
    private notificationLocalService: NotificationLocalService,
    private categoryService: CategoryService) {}

  ngOnInit(){
    this.settingsService.settings$.subscribe(settings => {
      if(settings){
        this.settings = settings;
      }
    })
    this.taskService.currentTask$.subscribe(task => {
      this.selectedTask = task;

      if(task){
        this.timerType = task['timer']
      }
    });

    this.authenticationService.currentAuthenticationState.subscribe((state) => {
      this.isAuthenticated = state;
    })

    this.categoryService.categories$.subscribe(categories => {
      console.log(categories);
      if(categories.length > 0){
        this.categories = JSON.parse(categories);
      }
    })
  
  }

  showCreateTaskDialog(){
    const modal = this.modalService.create({
      nzTitle: 'Create Task',
      nzContent: CreateTaskComponent,
      nzWidth: '80vw',
      nzData: {
        categories: this.categories
      },
      nzOnOk: async () => {
        const modalTask = modal.getContentComponent().taskData;

        if(this.isAuthenticated){
          this.taskService.createTask(modalTask).subscribe({
            next: (data: any) => {
              this.notificationLocalService.createSuccessNotification('Successfully created task!')
            },
            error: (err) => {
              this.notificationLocalService.createErrorNotification('Something went wrong uploading the task data!')
            }
          })
        }
        this.taskService.setLocalTask(modalTask)
        this.selectedTask = modalTask

        modal.destroy();
      }
    });
  }
}


