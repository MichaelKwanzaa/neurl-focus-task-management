import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { User } from 'src/app/models';
import { BaseService } from '../base-service.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private cachedUser$: Observable<User | null> | null = null;

  currentUser$: Observable<User | null> = this.userSubject.asObservable();


  constructor(private http: HttpClient, private storageService: StorageService) {
    super('user')
   }

   getUser(){
    if (!this.cachedUser$) {
      this.cachedUser$ = this.http.get<any>(this.baseUrl + `/get-user`, { headers: this.header, withCredentials: true }).pipe(
        shareReplay(1)
      );
    }
    return this.cachedUser$;
   }
}
