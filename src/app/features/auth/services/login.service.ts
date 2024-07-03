import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../interfaces/login.interface';
import { LoginResponseInterface } from '../interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private loginUrl = `${this.apiUrl}/api/account/auth/login`;

  constructor(private http: HttpClient) {}

  submitLogin(login: LoginInterface) {
    return this.http.post<LoginResponseInterface>(this.loginUrl, login);
  }
}
