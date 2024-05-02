import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { NotificationLocalService } from 'src/app/core/services/notification-local-service/notification-local.service';

@Component({
  selector: 'app-google-authentication-callback',
  templateUrl: './google-authentication-callback.component.html',
  styleUrls: ['./google-authentication-callback.component.scss']
})
export class GoogleAuthenticationCallbackComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificationLocalService: NotificationLocalService){

  }

  ngOnInit(){
    const accessToken = this.route.snapshot.queryParamMap.get('accessToken');
    const refreshToken = this.route.snapshot.queryParamMap.get('refreshToken');

    this.notificationLocalService.createSuccessNotification("Successfully logged in!")
    this.authService.handleAuthentication(accessToken, refreshToken);
    // Redirect to the desired route after successful authentication
    this.router.navigate(['/']);
  }
}
