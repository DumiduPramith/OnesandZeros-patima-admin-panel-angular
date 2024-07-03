import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteAccountService {
  private apiUrl = environment.apiUrl;
  private detele_user_url = `${this.apiUrl}/api/admin/delete-user`;
  constructor(private http: HttpClient) {}

  deleteUser(id: number) {
    const data = {
      user_id: id,
    };
    return this.http.request('delete', this.detele_user_url, {
      body: data,
    });
  }
}
