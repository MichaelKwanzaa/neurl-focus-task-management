import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { GoogleAuthenticationCallbackComponent } from './components/google-authentication-callback/google-authentication-callback.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { SubscriptionPaymentComponent } from './components/subscription-payment/subscription-payment.component';
import { SubscribePageComponent } from './components/subscribe-page/subscribe-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Home - Neurl Focus Management'
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    title: 'Settings - Neurl Focus Management'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login - Neurl Focus Management'
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register - Neurl Focus Management'
  },
  {
    path: 'auth-call-back-google',
    component: GoogleAuthenticationCallbackComponent,
    title: 'Returning back to homepage...'
  },
  {
    path: 'tasks',
    component: TasksPageComponent,
    title: 'Tasks - Neurl Focus Management'
  },
  {
    path: 'subscription-payment',
    component: SubscriptionPaymentComponent,
    title: 'Handling Payment...'
  },
  {
    path: 'subscription',
    component: SubscribePageComponent,
    title: 'Subscribe - Neurl Focus Management'
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    title: 'Profile - Neurl Focus Management'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
