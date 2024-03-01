import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntServiceModule } from './services/ant-service/ant-service.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AntServiceModule
  ],
  exports: [
    AntServiceModule
  ]
})
export class CoreModule { }
