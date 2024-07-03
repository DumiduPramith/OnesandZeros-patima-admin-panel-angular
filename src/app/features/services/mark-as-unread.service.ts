import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BasicResponseInterface } from '../../core/interfaces/basic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MarkAsUnreadService {
  private apiUrl = environment.apiUrl;
  private fetch_message_url = `${this.apiUrl}/api/messages/admin/mark-as-unread`;
  constructor(private http: HttpClient) {}

  markAsUnread(message_id: number) {
    return this.http.put<BasicResponseInterface>(this.fetch_message_url, {
      message_id,
    });
  }
}
