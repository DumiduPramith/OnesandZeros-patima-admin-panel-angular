import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageResponseInterface } from '../interfaces/messages.response.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchMessagesService {
  private apiUrl = environment.apiUrl;
  private fetch_message_url = `${this.apiUrl}/api/messages/admin/retrieve`;

  constructor(private http: HttpClient) {}

  fetchAllMessages(page: number) {
    return this.http.get<MessageResponseInterface>(this.fetch_message_url, {
      params: {
        page: page.toString(),
      },
    });
  }
}
