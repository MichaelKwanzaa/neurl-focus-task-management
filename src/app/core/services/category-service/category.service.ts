import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models';
import { StorageService } from '../storage-service/storage.service';
import { BaseService } from '../base-service.service';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  private categoriesSubject = new BehaviorSubject<any[] | any>([]);
  categories$: Observable<any[] | any> = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) {
    super('category')
    this.init();
   }

   init(){
    const categories = this.storageService.getData(STORAGE_KEYS.CATEGORIES) || [];

    if(categories){
      this.categoriesSubject.next(categories);
    }
   }

   getUserCategories(){
    return this.http.get<any>(this.baseUrl + '/get-categories', { headers: this.header, withCredentials: true });
   }

   //LOCAL funcitons
   setLocalCategories(categories: any[]){
    this.categoriesSubject.next(JSON.stringify(categories));
    this.storageService.setData(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));

   }
}
