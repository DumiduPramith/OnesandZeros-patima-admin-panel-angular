import { UserInterface } from './user.interface';

export interface FeedbackInterface extends UserInterface {
  feedback_id: number;
  text: string;
  rating: number;
  archeologist_user_id: number;
  image_id: number;
  created_at: string;
  input_image_path: string;
  predicted_image_path: string;
}
