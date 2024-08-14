import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { NotificationLocalService } from 'src/app/core/services/notification-local-service/notification-local.service';
import { SettingService } from 'src/app/core/services/setting-service/setting.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';
import { Settings } from 'src/app/models';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  pomodoroWorkTime: any = 25;
  pomodoroShortBreakTime: any = 5;
  pomodoroLongBreakTime: any = 15;
  pomodoroIntervalCount: any = 4;


  settings : Settings = {};
  isAuthenticated: boolean = false;

  constructor(private settingsService: SettingService, private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private notificationLocalService: NotificationLocalService
  ){}

  ngOnInit(){
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
      this.pomodoroWorkTime = settings.pomodoroWorkTime;
      this.pomodoroShortBreakTime = settings.pomodoroShortBreakTime;
      this.pomodoroLongBreakTime = settings.pomodoroLongBreakTime;
      this.pomodoroIntervalCount = settings.pomodoroIntervalCount;
    })

    this.authenticationService.currentAuthenticationState.subscribe((state) => {
      this.isAuthenticated = state;
    })
  }

  upsertSettings(){
    this.settings = {
      pomodoroWorkTime: this.pomodoroWorkTime,
      pomodoroShortBreakTime: this.pomodoroShortBreakTime,
      pomodoroLongBreakTime: this.pomodoroLongBreakTime,
      pomodoroIntervalCount: this.pomodoroIntervalCount
    }

    this.settingsService.updateLocalSettings(this.settings)
 
    if(this.isAuthenticated){
      this.settingsService.upsertSetting(this.settings).subscribe(settings => {
        console.log(settings);
      })
    }
    
  }



}
