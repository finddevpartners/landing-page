import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorMessage = new Subject<string>();
  errorMessage$ = this.errorMessage.asObservable();

  private normalMessage = new Subject<string>();
  normalMessage$ = this.normalMessage.asObservable();

  showNormalMessage(message: string) {
    this.normalMessage.next(message);
  }

  showErrorMessage(message: string) {
    this.errorMessage.next(message);
  }
}
