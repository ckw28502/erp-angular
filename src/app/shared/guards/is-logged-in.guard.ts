import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auths/auth/auth.service';

export const isLoggedInGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
