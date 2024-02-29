import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { LoginModel } from 'src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(private http: HttpClient) {
    super('authentication')
   }

  login(loginModel: LoginModel): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/login", JSON.stringify(loginModel), { headers: this.header, withCredentials: true })
  }

  loginGoogle(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/oauth/google", { headers: this.header, withCredentials: true })
  }

   
}
