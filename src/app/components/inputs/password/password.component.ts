import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, NgIf],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  password: FormControl = new FormControl("", Validators.required);
  hidePassword: boolean = true;

  @Input() label: string = "";
  @Input() name: string = "";
  @Input() error: string = "";
  @Input() id: string = "";

  @Output() sendPasswordEvent: EventEmitter<string> = new EventEmitter<string>();

  togglePassword(event: MouseEvent): void {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  onValueChange(): void {
    this.sendPasswordEvent.emit(this.password.value);
  }
 
}
