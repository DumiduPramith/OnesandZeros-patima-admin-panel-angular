import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarkAsReadService {
  private apiUrl = environment.apiUrl;
  private fetch_message_url = `${this.apiUrl}/api/messages/admin/mark-as-read`;
  constructor(private http: HttpClient) {}

  markAdRead(message_id: number) {
    return this.http.put(this.fetch_message_url, {
      message_id,
    });
  }
}
