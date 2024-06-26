import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from '../../components/inputs/password/password.component';
import { LoginService } from '../../shared/services/auths/login/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/tools/toast.service';
import { LoginRequest } from '../../shared/dto/requests/auths/login-request.model';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    PasswordComponent,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fg: FormGroup;  

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.fg = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  private getFormValue(key: string): string {
    return this.fg.get(key)?.value;
  }

  get username(): AbstractControl {
    return this.fg.get("username")!;
  }

  login(): void {
    if (this.fg.valid) {
      const request: LoginRequest = {
        username: this.getFormValue("username"),
        password: this.getFormValue("password")
      }
      
      this.loginService.login(request)
        .subscribe({
          next: response => {
            sessionStorage.setItem("token", response.token);            
            this.router.navigate(["/"]);
          },
          error: () => this.toastService.show("INVALID CREDENTIALS PROVIDED!", "CLOSE")
        });    
    }
  }

  onPasswordChange(password: string): void {
    this.fg.patchValue({ password });    
  }

}
