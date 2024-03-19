import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SettingService } from 'src/app/core/services/setting-service/setting.service';
import { Settings, Task } from 'src/app/models';
import { CreateTaskComponent } from '../elements/dialogs/create-task/create-task.component';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { TaskService } from 'src/app/core/services/task-service/task.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  timerType: string = 'pomodoro';
  settings: any = null;
  selectedTask: any = null;
  isAuthenticated: boolean = false;

  constructor(private settingsService: SettingService,
    private modalService: NzModalService,
    private authenticationService: AuthenticationService,
    private taskService: TaskService,
    private storageService: StorageService) {}

  ngOnInit(){
    this.settings = this.settingsService.getLocalSettings();
    this.taskService.currentTask$.subscribe(task => {
      this.selectedTask = task;
    });
    this.authenticationService.currentAuthenticationState.subscribe((state) => {
      this.isAuthenticated = state;
    })
    
    if(this.selectedTask){
      this.timerType = this.selectedTask['timer']
    }
  }

  showCreateTaskDialog(){
    const modal = this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: CreateTaskComponent,
      nzWidth: '80vw',
      nzOnOk: async () => {
        const modalTask = modal.getContentComponent().taskData;

        if(this.isAuthenticated){
          this.taskService.createTask(modalTask).subscribe(() => {
            console.log('saved')
          })
        }

        this.taskService.setLocalTask(modalTask)
        this.selectedTask = modalTask

        modal.destroy();
      }
    });
  }
}
