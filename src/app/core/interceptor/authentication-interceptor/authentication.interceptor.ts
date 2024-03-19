import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { AuthenticationService } from "../../services/authentication-service/authentication.service";
import { Injectable } from "@angular/core";
import { StorageService } from "../../services/storage-service/storage.service";
import { STORAGE_KEYS } from "src/app/models/Storage_keys.model";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor{

    constructor(private authService: AuthenticationService,
        private storageService: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401 && !req.url.includes('/refresh-token')) {
                    return this.authService.refreshAuthentication().pipe(
                        switchMap((newAccessToken) => {
                            console.log({newAccessToken})
                            const accessToken = newAccessToken.data.accessToken;
                            this.authService.storeAccessToken(accessToken)
                            return next.handle(req)
                        })
                    )
                }
                return throwError(error)
            })
        )
    }
}
