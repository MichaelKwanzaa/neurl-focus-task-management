import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { Settings } from 'src/app/models';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends BaseService{
  pomodoroWorkTime: any = 25;
  pomodoroShortBreakTime: any = 5;
  pomodoroLongBreakTime: any = 15;
  pomodoroIntervalCount: any = 4;

  settings: Settings = {
    pomodoroWorkTime: this.pomodoroWorkTime,
    pomodoroShortBreakTime: this.pomodoroShortBreakTime,
    pomodoroLongBreakTime: this.pomodoroLongBreakTime,
    pomodoroIntervalCount: this.pomodoroIntervalCount
  }

  constructor(private http: HttpClient, private storageService: StorageService) { 
    super('setting')

    this.settings = this.storageService.getData(STORAGE_KEYS.SETTINGS);
  }

  getSetting(): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/get-setting', { headers: this.header, withCredentials: true })
  }

  upsertSetting(settingModel: Settings): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/upsert-setting', JSON.stringify(settingModel), { headers: this.header, withCredentials: true })
  }

  // ---------- functions ---------- //

  public updateLocalSettings(settings: Settings){
    console.log(settings, "getting the settings from somehwre")
    this.settings = settings;
    this.storageService.setData(STORAGE_KEYS.SETTINGS, settings);
  }

  public getLocalSettings(){
    return this.settings;
  }


}
