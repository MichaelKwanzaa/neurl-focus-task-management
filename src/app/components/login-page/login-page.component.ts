import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import getGoogleOAuthUrl from 'src/app/core/utils/googleOAuthHandler';

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

  constructor(private fb: NonNullableFormBuilder) {}


  googleSignIn(){
    const googleUrl = getGoogleOAuthUrl();
    return googleUrl;
  }

  loginUser(){

  }
}

