import { FeedbackInterface } from './feedback.interface';

export interface FeedbackResponseInterface {
  status: string;
  feedbacks: FeedbackInterface[];
  message: string;
}
