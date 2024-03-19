import { EventEmitter, Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage-service/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/models';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {
  private currentTaskSubject = new BehaviorSubject<Task | null>(null);
  currentTask$: Observable<Task | null> = this.currentTaskSubject.asObservable();

  private tasksSubject = new BehaviorSubject<any[] | any>(null);
  tasks$: Observable<any[] | any> = this.tasksSubject.asObservable()

  constructor(private http: HttpClient, private storageService: StorageService) {
    super('task')
    this.init();
   }

   init(){
    const currentTask = this.storageService.getData(STORAGE_KEYS.CURRENT_TASK) || null;
    
    const tasks = this.storageService.getData(STORAGE_KEYS.TASKS) || [];
    
    if(currentTask){
      this.currentTaskSubject.next(currentTask)
    }

    if(tasks){
      this.tasksSubject.next(tasks);
    }
   }

   getTask(id: string) {
    return this.http.get<any>(this.baseUrl + `/get-task/${id}`, { headers: this.header, withCredentials: true })
   }

   createTask(task: Task){
    console.log(task)
    return this.http.post<any>(this.baseUrl + `/create-task`, JSON.stringify(task), { headers: this.header, withCredentials: true })
   }

   getAllTasks(){
    return this.http.get<any>(this.baseUrl + '/get-tasks', { headers: this.header, withCredentials: true });
   }

   updateTask(id: string, task: Task){
    return this.http.put<any>(this.baseUrl + `/update-task/${id}`, JSON.stringify(task), { headers: this.header, withCredentials: true });
   }

   deleteTask(id: string){
    return this.http.delete<any>(this.baseUrl + `/delete-task/${id}`, { headers: this.header, withCredentials: true });
   }

   //LOCAL FUNCTIONS
  

   getLocalTask(){
    return this.currentTaskSubject.getValue(); // Get current value
   }

   setLocalTask(task: Task){
    this.currentTaskSubject.next(task);
    this.storageService.setData(STORAGE_KEYS.CURRENT_TASK, task);
   }

   getAllLocalTasks(){
    return this.tasksSubject.getValue();
   }

   setAllTasks(tasks: any[]){
    this.tasksSubject.next(JSON.stringify(tasks));
    this.storageService.setData(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
   }
}
