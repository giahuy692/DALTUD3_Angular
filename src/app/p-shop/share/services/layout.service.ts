import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DTOProduct } from '../dtos/DTOProduct';
import { DTOUser } from '../dtos/DTOUser';
import { DTOOrder } from '../dtos/DTOOrder';
import { AuthService } from './auth.service';
import { DTOCategory } from '../dtos/DTOCategory';
import { DTOTransaction } from '../dtos/DTOTransaction';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root',
})
export class layoutService {
  constructor(private noti: NotificationService) {}

  showSuccess(content: string) {
    this.noti.show({
      content: content,
      hideAfter: 600,
      position: { horizontal: 'left', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
    });
  }

  showWarning(content: string) {
    this.noti.show({
      content: content,
      hideAfter: 600,
      position: { horizontal: 'left', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'warning', icon: true },
    });
  }

  showError(content: string): void {
    this.noti.show({
      content: content,
      hideAfter: 600,
      position: { horizontal: 'left', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true },
    });
  }

  hasValue(value: any) {
    if (value !== null || value !== undefined || value !== '') {
      return true;
    } else {
      return false;
    }
  }
}
