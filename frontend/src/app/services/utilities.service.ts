import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private notificationService: NotificationsService) { }

  onSuccess(msg: string) {
    this.notificationService.success('Success', msg, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: 'true'
    });
  }

  onError(msg: string) {
    this.notificationService.error('Error', msg, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: 'true'
    });
  }
}
