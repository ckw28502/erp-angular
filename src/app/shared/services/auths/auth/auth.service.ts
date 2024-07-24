import { Injectable } from '@angular/core';
import { Role } from '../../../models/enums/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  checkRole(role: Role | null): boolean {
    if (!role) {
      return !this.getToken();
    }
    if (this.getToken()) {
      console.log(sessionStorage.getItem("role"));
      
      return sessionStorage.getItem("role") === role;
    }
    return false;
  }
}
