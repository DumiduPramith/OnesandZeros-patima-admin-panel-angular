import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PredictionResponseInterface } from '../interfaces/prediction.response.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUserPredictionsService {
  private apiUrl = environment.apiUrl;
  private retrieve_predictions_url = `${this.apiUrl}/api/prediction/admin/retrieve-predictions`;

  constructor(private http: HttpClient) {}

  retrievePredictions(user_id: number, page: number) {
    return this.http.get<PredictionResponseInterface>(
      this.retrieve_predictions_url,
      {
        params: {
          page,
          user_id,
        },
      }
    );
  }
}
