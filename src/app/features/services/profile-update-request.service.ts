import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { BasicResponseInterface } from '../../core/interfaces/basic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateRequestService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  private retrieve_user_url = `${this.apiUrl}/api/admin/update-user`;

  updateProfileRequest(data: UserInterface) {
    return this.http.put<BasicResponseInterface>(this.retrieve_user_url, data);
  }
}
