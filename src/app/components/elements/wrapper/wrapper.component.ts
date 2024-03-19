import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, shareReplay, take } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { SettingService } from 'src/app/core/services/setting-service/setting.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';
import { TaskService } from 'src/app/core/services/task-service/task.service';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { Settings } from 'src/app/models/Settings.model';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  isLoggedIn: boolean = false;
  notifications: Array<any> = [];
  name: string = ''
  profilePicture: string = ''

  userList: Array<string> = ['Lucy', 'U', 'Tom', 'Edward'];
  colorList: Array<string> = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  constructor(private router: Router, 
    private settingsService: SettingService,
    private tasksService: TaskService,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private userService: UserService){

    }

  ngOnInit(){
    this.authenticationService.currentAuthenticationState.pipe(shareReplay(), take(1)).subscribe((state) => {
      if(state){
        this.isLoggedIn = true;

        this.userService.getUser().subscribe((userData) => {
          console.log(userData)

          const user = userData.data.data;
          const pomodoroWorkTime = user['settings'].pomodoroWorkTime;
          const pomodoroShortBreakTime = user['settings'].pomodoroShortBreakTime;
          const pomodoroLongBreakTime = user['settings'].pomodoroLongBreakTime;
          const pomodoroIntervalCount = user['settings'].pomodoroIntervalCount;
          const blockedUrls = user['settings'].blockedUrls;

          if(user['picture']){
            this.profilePicture = user['picture']
          }

          this.name = user['name']
          const updatedSettings = {
            pomodoroWorkTime,
            pomodoroShortBreakTime,
            pomodoroLongBreakTime,
            pomodoroIntervalCount,
            blockedUrls
          }


          this.settingsService.updateLocalSettings(updatedSettings);
          this.tasksService.setAllTasks(user['tasks']);
        })

      } else {
        this.isLoggedIn = false;
      }
    })
  }

  showNotification(){

  }

  handleDropdownVisibility(isVisible: boolean) {
    // Perform actions when dropdown opens/closes (optional)
  }

  closeNotifications(){

  }

  goToUrl(url: string){
    this.router.navigate([`/${url}`])
  }

  logout(){

  }
}
