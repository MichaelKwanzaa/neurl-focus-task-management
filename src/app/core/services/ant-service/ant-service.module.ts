import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzStepsModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzBadgeModule,
    NzDropDownModule,
    NzAvatarModule,
    NzInputNumberModule,
    NzSliderModule,
    NzFormModule,
    NzInputModule
  ],
  exports: [
    NzLayoutModule,
    NzStepsModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzBadgeModule,
    NzDropDownModule,
    NzAvatarModule,
    NzInputNumberModule,
    NzSliderModule,
    NzFormModule,
    NzInputModule
  ]
})
export class AntServiceModule { }
