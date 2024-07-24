import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/auths/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const roleGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {  
  const authorized: boolean = inject(AuthService).checkRole(route.data?.["role"]);  
  return authorized;
};
