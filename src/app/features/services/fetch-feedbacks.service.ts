import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackResponseInterface } from '../interfaces/feedback.response.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchFeedbacksService {
  private apiUrl = environment.apiUrl;
  private fetch_reviews_url = `${this.apiUrl}/api/feedback/admin/get-all`;

  constructor(private http: HttpClient) {}

  fetchFeedbacks(page: number) {
    return this.http.get<FeedbackResponseInterface>(this.fetch_reviews_url, {
      params: {
        page: page.toString(),
      },
    });
  }
}
