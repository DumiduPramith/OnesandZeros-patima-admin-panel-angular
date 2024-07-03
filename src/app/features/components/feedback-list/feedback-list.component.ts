import { FeedbackResponseInterface } from './../../interfaces/feedback.response.interface';
import { Component, inject } from '@angular/core';
import { FeedbackCardComponent } from '../../../shared/components/feedback-card/feedback-card.component';
import { FetchFeedbacksService } from '../../services/fetch-feedbacks.service';
import { Subscription } from 'rxjs';
import { FeedbackInterface } from '../../interfaces/feedback.interface';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [FeedbackCardComponent],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss',
})
export class FeedbackListComponent {
  private feedbackRetrieveService = inject(FetchFeedbacksService);
  private feedbackRetrieveSubscription: Subscription = Subscription.EMPTY;
  feedbacks: FeedbackInterface[] = [];

  ngOnInit() {
    this.feedbackRetrieveSubscription = this.feedbackRetrieveService
      .fetchFeedbacks(1)
      .subscribe({
        next: (data) => {
          this.feedbacks = data.feedbacks;
        },
        error: (error) => {
          console.error('Error fetching feedbacks: ', error);
        },
      });
  }

  ngOnDestroy() {
    if (this.feedbackRetrieveSubscription) {
      this.feedbackRetrieveSubscription.unsubscribe();
    }
  }
}
