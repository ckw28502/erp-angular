import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LoginResponse } from '../../../dto/responses/auths/login-response.model';
import { LoginRequest } from '../../../dto/requests/auths/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static readonly API_ENDPOINT: string = `${environment.serverUri}/employees/login/`;

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LoginService.API_ENDPOINT, request);
  }
}
