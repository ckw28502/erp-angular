import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private host: string = process.env.SERVER_URI;

  constructor(private http: HttpClient) { }

  login(username: string, )
}
