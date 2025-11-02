import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new BehaviorSubject<{ message: string, visible: boolean }>({ message: '', visible: false });
  snackbar$: Observable<{ message: string, visible: boolean }> = this.snackbarSubject.asObservable();

  show(message: string) {
    this.snackbarSubject.next({ message, visible: true });
    setTimeout(() => {
      this.hide();
    }, 3000); // Hide after 3 seconds
  }

  hide() {
    this.snackbarSubject.next({ message: '', visible: false });
  }
}
