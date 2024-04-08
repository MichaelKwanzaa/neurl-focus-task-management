import { Component } from '@angular/core';
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

  constructor(private settingsService: SettingService, private storageService: StorageService){}

  ngOnInit(){
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
    })
  }

  upsertSettings(){
    this.settings = {
      pomodoroWorkTime: this.pomodoroWorkTime,
      pomodoroShortBreakTime: this.pomodoroShortBreakTime,
      pomodoroLongBreakTime: this.pomodoroLongBreakTime,
      pomodoroIntervalCount: this.pomodoroIntervalCount
    }

    this.storageService.setData(STORAGE_KEYS.SETTINGS, this.settings);

    this.settingsService.upsertSetting(this.settings).subscribe(settings => {
      console.log(settings);
    })
  }



}
