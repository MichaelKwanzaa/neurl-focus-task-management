import { CanActivate, CanActivateFn, CanLoad, Router, UrlTree } from '@angular/router';
import { TimerService } from '../../services/timer-service/timer.service';
import { Observable, map } from 'rxjs';
import { UrlRestrictionService } from '../../services/url-restriction-service/url-restriction.service';

export class NavigationGuard implements CanActivate, CanLoad {
  constructor(
    private timerService: TimerService,
    private urlRestrictionService: UrlRestrictionService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkNavigation();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.checkNavigation();
  }

  private checkNavigation(): Observable<boolean | UrlTree> {
    return this.timerService.timerActive.pipe(
      map(isActive => {
        const url = this.router.url;
        const isRestricted = this.urlRestrictionService.isUrlRestricted(url);
        if (isActive && isRestricted) {
          // Deny access or take appropriate action (e.g., show a warning)
          return false;
        }
        return true;
      })
    );
  }
}