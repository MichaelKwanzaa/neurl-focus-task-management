import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl: string = environment.serverUrl;
  protected header = new HttpHeaders().set('Content-type', 'application/json');

    constructor(@Inject(String) slug?: string){
        if(slug?.length === 0 || !slug){
            this.baseUrl = this.baseUrl;
        } else {
            this.baseUrl = this.baseUrl + slug;
        }
    }
}
