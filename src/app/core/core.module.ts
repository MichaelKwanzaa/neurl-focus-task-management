import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntServiceModule } from './services/ant-service/ant-service.module';
import { FormatTimePipe } from './pipes/format-time-pipe/format-time.pipe';
import { CapitalizePipe } from './pipes/capitalize-pipe/capitalize.pipe';



@NgModule({
  declarations: [
    FormatTimePipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    AntServiceModule
  ],
  exports: [
    AntServiceModule,
    FormatTimePipe,
    CapitalizePipe
  ]
})
export class CoreModule { }
