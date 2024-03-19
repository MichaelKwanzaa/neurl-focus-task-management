import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsModule } from './elements/elements.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CoreModule } from '../core/core.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { GoogleAuthenticationCallbackComponent } from './google-authentication-callback/google-authentication-callback.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { SubscriptionPaymentComponent } from './subscription-payment/subscription-payment.component';
import { SubscribePageComponent } from './subscribe-page/subscribe-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    SettingsPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    GoogleAuthenticationCallbackComponent,
    TasksPageComponent,
    SubscriptionPaymentComponent,
    SubscribePageComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ElementsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LandingPageComponent,
    SettingsPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    GoogleAuthenticationCallbackComponent,
    TasksPageComponent
  ]
})
export class ComponentsModule { }
