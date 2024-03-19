import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { LoginModel } from 'src/app/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
import {jwtDecode} from 'jwt-decode';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public accessToken$: Observable<string | null> = this.accessTokenSubject.asObservable();

  private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentAuthenticationState: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient,
    private storageService: StorageService) {
    super('authentication')
    this.checkAuthentication();
    
   }

  login(loginModel: LoginModel): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/login", JSON.stringify(loginModel), { headers: this.header, withCredentials: true })
  }

  loginGoogle(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/oauth/google", { headers: this.header, withCredentials: true })
  }

  refreshAuthentication(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/refresh-token", { headers: this.header, withCredentials: true })
  }

  //  ----<!---- jfiejfieje --> //

  storeAccessToken(accessToken: string) {
    this.storageService.removeData(STORAGE_KEYS.ACCESS_TOKEN);
    this.storageService.setData(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.accessTokenSubject.next(accessToken);
  }

  handleAuthentication(accessToken: string | null, refreshToken: string | null){
    this.accessTokenSubject.next(accessToken);
    this.authenticatedSubject.next(true)

    // Store the tokens in local storage or wherever you want
    this.storageService.setData(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.storageService.setData(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  private checkAuthentication(): void {
    const accessToken = this.storageService.getData(STORAGE_KEYS.ACCESS_TOKEN)
    
    if (accessToken) {
      try {
        const decodedToken: any = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000; // Convert from seconds to milliseconds
        const currentTime = new Date().getTime();
  
        console.log({expirationTime}, {currentTime})
        if (currentTime < expirationTime) {
          this.authenticatedSubject.next(true);
        } else {
          this.refreshAuthentication().subscribe({
            next: (result: any) => {
                const accessToken = result.data.accessToken;
                this.storeAccessToken(accessToken)
            },
            error: (error: any) => {
              console.log(error)
            }
          })
          this.authenticatedSubject.next(false);
        }
      } catch (error) {
        console.error('Error decoding access token:', error);
        this.authenticatedSubject.next(false);
        this.accessTokenSubject.next(null);
      }
    } else {
      this.authenticatedSubject.next(false);
      this.accessTokenSubject.next(null);
    }
  }
   
}
