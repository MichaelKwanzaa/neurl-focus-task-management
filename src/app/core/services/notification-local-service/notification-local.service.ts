import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationLocalService {
  placement: NzNotificationPlacement = 'bottomLeft';

  constructor(private notification: NzNotificationService) { }

  createSuccessNotification(message: string, position: NzNotificationPlacement = this.placement){
    this.notification.blank(
      'Success',
      message,
      { nzPlacement: position }
    );
  }

  createErrorNotification(message: string, position: NzNotificationPlacement = this.placement){
    this.notification.blank(
      'Error',
      message,
      { nzPlacement: position }
    );
  }
}
