import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AllUsersResponseInterface } from '../interfaces/all_users.response.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  private retrieve_user_url = `${this.apiUrl}/api/admin/retrieve-users`;

  getUsers(type: number) {
    return this.http.get<AllUsersResponseInterface>(this.retrieve_user_url, {
      params: {
        role: type,
      },
    });
  }
}
