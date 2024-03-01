import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsModule } from './elements/elements.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CoreModule } from '../core/core.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule



@NgModule({
  declarations: [
    LandingPageComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    ElementsModule,
    CoreModule,
    FormsModule
  ],
  exports: [
    LandingPageComponent
  ]
})
export class ComponentsModule { }
