import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
