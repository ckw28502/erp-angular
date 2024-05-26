import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from '../../components/inputs/password/password.component';
import { LoginService } from '../../shared/services/auths/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/tools/toast.service';
import { LoginRequest } from '../../shared/dto/requests/auths/login-request.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    PasswordComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService, private router: Router, private toastService: ToastService) { }

  login(): void {
    const request: LoginRequest = {
      username: this.username,
      password: this.password
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

  onPasswordChange(password: string): void {
    this.password = password;
  }
}
