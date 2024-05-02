import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { NotificationLocalService } from 'src/app/core/services/notification-local-service/notification-local.service';
import getGoogleOAuthUrl from 'src/app/core/utils/googleOAuthHandler';
import { LoginModel } from 'src/app/models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: NonNullableFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationLocalService: NotificationLocalService
  ) {}


  googleSignIn(){
    const googleUrl = getGoogleOAuthUrl();
    return googleUrl;
  }

  loginUser(){
    const loginModel: LoginModel = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }

    this.authenticationService.login(loginModel).subscribe({
      next: (result: any) => {
        this.notificationLocalService.createSuccessNotification("Successfully logged in!")

        const accessToken = result.data['accessToken']
        const refreshToken = result.data['refreshToken']
        this.authenticationService.handleAuthentication(accessToken, refreshToken);
        this.router.navigate(['/']);

      },
      error: (err: any) => {
        this.notificationLocalService.createErrorNotification("Something went wrong!")
        console.log({err})
      }
    })
  }

  goToUrl(url: string){ 
    this.router.navigate([`/${url}`])
  }
}

