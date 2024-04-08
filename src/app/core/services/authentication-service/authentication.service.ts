import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { LoginModel } from 'src/app/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
import { STORAGE_KEYS } from 'src/app/models/Storage_keys.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public accessToken$: Observable<string | null> = this.accessTokenSubject.asObservable();

  private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentAuthenticationState: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    super('authentication');
    this.loadAuthenticationState();
  }

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/login", JSON.stringify(loginModel), { headers: this.header, withCredentials: true });
  }

  loginGoogle(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/oauth/google", { headers: this.header, withCredentials: true });
  }

  refreshAuthentication(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/refresh-token", { headers: this.header, withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/logout", { headers: this.header, withCredentials: true });
  }

  storeAccessToken(accessToken: string) {
    this.storageService.setData(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.accessTokenSubject.next(accessToken);
  }

  handleAuthentication(accessToken: string | null, refreshToken: string | null) {
    this.accessTokenSubject.next(accessToken);
    this.authenticatedSubject.next(!!accessToken);

    if (accessToken) {
      this.storageService.setData(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      this.storageService.setData(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }

  handleLocalLogout() {
    this.handleAuthentication(null, null);
    this.router.navigate(['/login']);
  }

  private loadAuthenticationState() {
  const accessToken = this.storageService.getData(STORAGE_KEYS.ACCESS_TOKEN);

  if (!accessToken) {
    // If access token is null, remove any existing authentication data
    return;
  } else {
    // If access token is present, update the subject and state accordingly
    this.accessTokenSubject.next(accessToken);
    this.authenticatedSubject.next(true);
  }
  }
}