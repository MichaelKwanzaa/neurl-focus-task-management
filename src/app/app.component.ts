import { Component } from '@angular/core';
import getGoogleOAuthUrl from './core/utils/googleOAuthHandler';
import { AuthenticationService } from './core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private authenticationService: AuthenticationService){
    
  }

  getGoogleOAuthUrl(){
    return getGoogleOAuthUrl();
  }
}
