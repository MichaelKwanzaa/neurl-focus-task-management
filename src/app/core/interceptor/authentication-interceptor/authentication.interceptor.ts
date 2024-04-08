import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, filter, finalize, mergeMap, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../../services/authentication-service/authentication.service";
import { Injectable } from "@angular/core";
import { StorageService } from "../../services/storage-service/storage.service";
import { STORAGE_KEYS } from "src/app/models/Storage_keys.model";
import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor{
    private refreshTokenSubject: BehaviorSubject<null> = new BehaviorSubject(null);

    constructor(private authService: AuthenticationService,
        private storageService: StorageService){

    }

   
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.storageService.getData(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = this.storageService.getData(STORAGE_KEYS.REFRESH_TOKEN);

    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      const expirationTime = decodedToken.exp * 1000; // Convert from seconds to milliseconds
      const currentTime = new Date().getTime();
      const timeRemaining = expirationTime - currentTime;
  
      console.log(timeRemaining)
      if (timeRemaining < 5 * 60 * 1000) {
        // Refresh the access token
        this.refreshTokenSubject.next(refreshToken);
        return this.handleTokenRefresh(req, next);
      }
    }
  
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/refresh-token')) {
          return this.handleTokenRefresh(req, next);
        }
        return throwError(error);
      })
    );
  }
  
  private handleTokenRefresh(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((refreshError: HttpErrorResponse) => {
        console.error('Error refreshing token:', refreshError.status);
        if(refreshError.status === 401 && !req.url.includes('/refresh-token')){
          return next.handle(req).pipe(
            mergeMap(() => this.authService.refreshAuthentication()),
            switchMap((newAccessToken) => {
              console.log({ newAccessToken });
              const accessToken = newAccessToken.data.accessToken;
              this.authService.storeAccessToken(accessToken);
              return next.handle(req);
            }),
            catchError((refreshError: HttpErrorResponse) => {
              console.error('Error refreshing token:', refreshError);
              this.authService.logout();
              return throwError(refreshError);
            })
          )
        }
        return next.handle(req);
      })
    )
  }
}
