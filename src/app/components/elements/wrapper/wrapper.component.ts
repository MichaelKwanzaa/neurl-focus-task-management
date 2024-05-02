import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, shareReplay, take } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { CategoryService } from 'src/app/core/services/category-service/category.service';
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
    private userService: UserService,
    private categoryService: CategoryService){

    }

  ngOnInit(){
    
    this.authenticationService.currentAuthenticationState.subscribe((state) => {
      if(state){
        this.isLoggedIn = true;

        //refresh all tasks and settings to their origin state
        this.tasksService.setAllTasks([]);
        this.settingsService.updateLocalSettings({
          pomodoroWorkTime: 25,
          pomodoroShortBreakTime: 5,
          pomodoroLongBreakTime: 15,
          pomodoroIntervalCount: 4
        })

        const user$ = this.userService.getUser();

        const categories$ = this.categoryService.getUserCategories();


        forkJoin([user$, categories$]).subscribe((responses) => {
          const userData = responses[0];
          const categoriesData = responses[1];

          console.log({userData})

          /** start of user data sorting */
          const user = userData.data.data;

          if(user['settings']){
            const pomodoroWorkTime = user['settings'].pomodoroWorkTime;
            const pomodoroShortBreakTime = user['settings'].pomodoroShortBreakTime;
            const pomodoroLongBreakTime = user['settings'].pomodoroLongBreakTime;
            const pomodoroIntervalCount = user['settings'].pomodoroIntervalCount;
            const blockedUrls = user['settings'].blockedUrls;  

            const updatedSettings = {
              pomodoroWorkTime,
              pomodoroShortBreakTime,
              pomodoroLongBreakTime,
              pomodoroIntervalCount,
              blockedUrls
            }

            this.settingsService.updateLocalSettings(updatedSettings);

          }

          console.log(user)

          if(user['picture']){
            this.profilePicture = user['picture']
          } else {
            this.profilePicture = ''
            this.name = user['name']
          }

       
          this.tasksService.setAllTasks(user['tasks']);
          /** end of user data sorting */
          /** start of category sorting */
          const categories = categoriesData.data.data;

          this.categoryService.setLocalCategories(categories);

          /**end of category sorting */

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
    this.authenticationService.logout().subscribe({
      next: (data: any) => {
        this.authenticationService.handleLocalLogout();
        this.isLoggedIn = false;
      },
      error: (err) => {
        this.authenticationService.handleLocalLogout();
        this.isLoggedIn = false;
      }
    })
  }
}
