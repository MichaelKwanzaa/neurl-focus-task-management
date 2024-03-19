import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { CoreModule } from 'src/app/core/core.module';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { InfiniteTimerComponent } from './infinite-timer/infinite-timer.component';
import { CreateTaskComponent } from './dialogs/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayTaskComponent } from './display-task/display-task.component';
import { EditTaskComponent } from './dialogs/edit-task/edit-task.component';



@NgModule({
  declarations: [
    SideBarComponent,
    WrapperComponent,
    PomodoroTimerComponent,
    TaskTimerComponent,
    InfiniteTimerComponent,
    CreateTaskComponent,
    DisplayTaskComponent,
    EditTaskComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SideBarComponent,
    WrapperComponent,
    PomodoroTimerComponent,
    TaskTimerComponent,
    InfiniteTimerComponent,
    CreateTaskComponent,
    DisplayTaskComponent,
  ]
})
export class ElementsModule { }
