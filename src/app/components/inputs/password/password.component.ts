import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  @Input({required: true}) value!: string;
  @Input({required: true}) name!: string;
  @Input({required: true}) placeholder!: string;
  @Output() updateValueEvent: EventEmitter<string> = new EventEmitter<string>();
  hidePassword: boolean = true;

  togglePassword(event: MouseEvent): void {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation()
  }

  onValueChanged(value: string): void {
    this.updateValueEvent.emit(value);
  }
}
