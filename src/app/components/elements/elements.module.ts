import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { CoreModule } from 'src/app/core/core.module';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { InfiniteTimerComponent } from './infinite-timer/infinite-timer.component';



@NgModule({
  declarations: [
    SideBarComponent,
    WrapperComponent,
    PomodoroTimerComponent,
    TaskTimerComponent,
    InfiniteTimerComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    SideBarComponent,
    WrapperComponent,
    PomodoroTimerComponent,
    TaskTimerComponent,
    InfiniteTimerComponent,
  ]
})
export class ElementsModule { }
