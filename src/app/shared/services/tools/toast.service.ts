import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action: string, timeout: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }
}
