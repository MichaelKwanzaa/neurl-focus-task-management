import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { NotificationLocalService } from 'src/app/core/services/notification-local-service/notification-local.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private notificationLocalService: NotificationLocalService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}

  registerUser() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register(name, email, password)
      .subscribe({
        next: (result: any) => {
          console.log(result);
          this.notificationLocalService.createSuccessNotification("Successfully registered user!")
          //this.router.navigate(['/login'])
        },
        error: (err: any) => {
          console.log(err);
          this.notificationLocalService.createErrorNotification("Something went wrong will registering!")
         
        }
      })
    } else {
      // Form is invalid, handle validation errors
      console.error('Form is invalid');
    }
  }

  goToUrl(url: string) {
    this.router.navigate([`/${url}`]);
  }

  googleSignIn() {
    // Implement Google Sign-In functionality
    // Return the URL or handle the sign-in process
    return 'https://accounts.google.com/';
  }
}
